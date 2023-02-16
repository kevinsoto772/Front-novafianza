import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WompiService } from '../../servicios/wompi.service';
import { ReCaptcha2Component } from 'ngx-captcha';

@Component({
  selector: 'app-modal-consulta-deuda',
  templateUrl: './consulta-deuda.component.html',
  styleUrls: ['./consulta-deuda.component.css']
})
export class ConsultaDeudaComponent implements OnInit {
  @ViewChild('captchaElem') captcha!: ReCaptcha2Component
  public llaveCaptcha = '6LemnwgjAAAAAD4NV9ROf1inZOsO5tmM71nNfaQn'
  public formulario: FormGroup
  public deuda: boolean = false;
  public consultado: boolean = false;
  public mostrarAlerta: boolean = false;
  constructor(private servicioWompi: WompiService, private enrutador: Router) {
    this.formulario = new FormGroup({
      tipo_documento: new FormControl('', [Validators.required]),
      numero_documento: new FormControl('', [Validators.required]),
      captcha: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
  }

  public consultarDueda(): void {
    console.log('consultando deudas')
    if (this.formulario.invalid) {
      console.log(this.formulario)
      this.marcarFormularioComoSucio();
      return;
    }
    this.servicioWompi.consultarDeuda(
      (this.formulario.controls['numero_documento'].value).toString(),
      this.formulario.controls['tipo_documento'].value
    ).subscribe((respuesta) => {
      this.consultado = true
      this.deuda = respuesta.deuda
      this.mostrarAlerta = true
    }), (error: HttpErrorResponse) => {
      console.log(error)
    }

  }

  public consultarOtraDueda(): void {
    this.consultado = false
    this.mostrarAlerta = false
    this.limpiarFormulario();
  }

  public cerrarAlerta(): void {
    console.log('cerrando alerta')
    this.mostrarAlerta = false
  }

  public procesoDePago(): void {
    let parametros: any[] = [];
    parametros.push((this.formulario.controls['numero_documento'].value));
    parametros.push(this.formulario.controls['tipo_documento'].value);
    //this.enrutador.navigate(['/proceso-pago'], { queryParams: { formulario: parametros } })
    window.open(`/wordpress/zona-pagos?numero_documento=${this.formulario.controls['numero_documento'].value}&tipo_documento=${this.formulario.controls['tipo_documento'].value}`, '_parent');
    this.limpiarFormulario();
  }

  public marcarFormularioComoSucio(): void {
    (<any>Object).values(this.formulario.controls).forEach((control: FormControl) => {
      control.markAsDirty();
      if (control) {
        control.markAsDirty()
      }
    });
  }

  public limpiarFormulario() {
    this.formulario.reset()
    this.captcha.resetCaptcha()
  }

}
