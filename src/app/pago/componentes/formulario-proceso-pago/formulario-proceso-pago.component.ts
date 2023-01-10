import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionRealizarTransaccion } from '../../modelos/PeticionRealizarTransaccion';
import { WompiService } from '../../servicios/wompi.service';

@Component({
  selector: 'app-formulario-proceso-pago',
  templateUrl: './formulario-proceso-pago.component.html',
  styleUrls: ['./formulario-proceso-pago.component.css']
})
export class FormularioProcesoPagoComponent implements OnInit {
  public llaveCaptcha = '6LemnwgjAAAAAD4NV9ROf1inZOsO5tmM71nNfaQn'
  public formulario: FormGroup
  public deuda: boolean = true;
  public informacion_deudor:any[] = []
  public errorValorPago?: number;

  constructor(private servicioWompi: WompiService, private enrutador: Router, private ruta: ActivatedRoute) {
    this.formulario = new FormGroup({
      tipo_documento: new FormControl('', [Validators.required]),
      numero_documento: new FormControl('', [Validators.required]),
      captcha: new FormControl(null, Validators.required),
      valor_pagar: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
      Correo: new FormControl(null, Validators.required),
      checkbox: new FormControl(false, Validators.requiredTrue)
    })
  }

  ngOnInit(): void {
    this.ruta.queryParams.subscribe((params: any) => {
      this.informacion_deudor = params.formulario;
      if (this.informacion_deudor.length > 0) {
        this.formulario.controls['tipo_documento'].setValue(this.informacion_deudor[1])
        this.formulario.controls['numero_documento'].setValue(this.informacion_deudor[0])
      }
    })
  }

  public iniciarPago() {
    if (this.formulario.invalid) {
      this.marcarFormularioComoSucio();
    }
    if (this.formulario.valid) {

      this.servicioWompi.consultarDeuda(
        (this.formulario.controls['numero_documento'].value).toString(),
        this.formulario.controls['tipo_documento'].value
      ).subscribe((respuesta) => {
        this.deuda = respuesta.deuda
      }, (error: HttpErrorResponse) => {
        console.log(error)
      }
      )

      this.servicioWompi.transaccion(new PeticionRealizarTransaccion(
        (this.formulario.controls['numero_documento'].value).toString(),
        this.formulario.controls['tipo_documento'].value,
        this.formulario.controls['telefono'].value,
        this.formulario.controls['valor_pagar'].value,
        this.formulario.controls['Correo'].value
      )
      ).subscribe((respuesta) => {
        let parametros: any[] = [];
        parametros.push(respuesta.referencia);
        parametros.push(respuesta.moneda);
        parametros.push(respuesta.llavePublicaWompi);
        parametros.push(respuesta.urlRedireccion);
        parametros.push(respuesta.valorEnCentavos);
        parametros.push(respuesta.datosUsuarios.documento);
        parametros.push(respuesta.datosUsuarios.email);
        parametros.push(respuesta.datosUsuarios.tipoDocumento);
        parametros.push(respuesta.datosUsuarios.telefono);
        parametros.push(respuesta.datosUsuarios.valor);
        this.enrutador.navigate(['/pagar-obligacion'], { queryParams: { formulario: parametros } })

      }, (errorTransaccion: HttpErrorResponse) => {
        if (errorTransaccion.status == 400) {
          this.errorValorPago = errorTransaccion.status
          console.log(this.errorValorPago)
        }
      }
      )

    }
  }

  public marcarFormularioComoSucio():void{
    (<any>Object).values(this.formulario.controls).forEach((control:FormControl) => {
      control.markAsDirty();
      if (control) {
        control.markAsDirty()
      }
    });
  }

}
