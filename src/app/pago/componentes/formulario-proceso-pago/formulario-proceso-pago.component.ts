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
  public deuda: boolean = false;
  public consultado: boolean = false;
  public mostrarAlerta:boolean = false
  public numero_documento: string = ''
  public tipo_documento: string = ''
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
      this.numero_documento = params.numero_documento;
      this.tipo_documento = params.tipo_documento;
      if (this.tipo_documento != '' && this.tipo_documento != '') {
        this.formulario.controls['tipo_documento'].setValue(this.tipo_documento)
        this.formulario.controls['numero_documento'].setValue(this.numero_documento)
      }
    })
  }

  public consultarDeuda() {
    if (this.formulario.invalid) {
      console.log(this.formulario)
      this.marcarFormularioComoSucio();
      return;
    }
    this.servicioWompi.consultarDeuda(
      (this.formulario.controls['numero_documento'].value).toString(),
      this.formulario.controls['tipo_documento'].value
    ).subscribe((respuesta) => {
      this.deuda = respuesta.deuda
      this.mostrarAlerta = true
      this.consultado = true
      if (this.deuda) {
        this.iniciarPago()
      }
    }, (error: HttpErrorResponse) => {
      console.log(error)
    })
  }

  private iniciarPago() {
    const valor = this.formulario.controls['valor_pagar'].value.replace(/,/g, '')
    this.servicioWompi.transaccion(new PeticionRealizarTransaccion(
      (this.formulario.controls['numero_documento'].value).toString(),
      this.formulario.controls['tipo_documento'].value,
      this.formulario.controls['telefono'].value,
      valor,
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

  public marcarFormularioComoSucio(): void {
    (<any>Object).values(this.formulario.controls).forEach((control: FormControl) => {
      control.markAsDirty();
      if (control) {
        control.markAsDirty()
      }
    });
  }


  public cerrarAlerta(){
    this.mostrarAlerta = false
  }
}
