import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WompiService } from '../../servicios/wompi.service';

@Component({
  selector: 'app-modal-consulta-deuda',
  templateUrl: './consulta-deuda.component.html',
  styleUrls: ['./consulta-deuda.component.css']
})
export class ConsultaDeudaComponent implements OnInit {
  public llaveCaptcha = '6LemnwgjAAAAAD4NV9ROf1inZOsO5tmM71nNfaQn'
  public formulario: FormGroup
  public deuda: boolean = false;
  constructor(private servicioWompi: WompiService, private enrutador: Router) {
    this.formulario = new FormGroup({
      tipo_documento: new FormControl('', [Validators.required]),
      numero_documento: new FormControl('', [Validators.required]),
      captcha: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
  }

  public consultarDueda(): void{
    if (this.formulario.invalid) {
      this.marcarFormularioComoSucio();
    }
    if (this.formulario.valid) {
      this.servicioWompi.consultarDeuda(
        (this.formulario.controls['numero_documento'].value).toString(),
        this.formulario.controls['tipo_documento'].value
      ).subscribe((respuesta) => {
        this.deuda = respuesta.deuda
      }), (error: HttpErrorResponse) => {
        console.log(error)
        }
    }
}

  public consultarOtraDueda(): void{
    this.deuda = false
    this.limpiarFormulario();
}

public procesoDePago(): void{
  let parametros: any[] = [];
  parametros.push((this.formulario.controls['numero_documento'].value));
  parametros.push(this.formulario.controls['tipo_documento'].value);
  this.enrutador.navigate(['//proceso-pago'], { queryParams: { formulario: parametros } })
  this.limpiarFormulario();
}

  public marcarFormularioComoSucio():void{
    (<any>Object).values(this.formulario.controls).forEach((control:FormControl) => {
      control.markAsDirty();
      if (control) {
        control.markAsDirty()
      }
    });
  }

  public limpiarFormulario(){
    this.formulario.reset()
  }

}
