import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioCabeceraService } from 'src/app/administrador/servicios/servicio-cabecera.service';

@Component({
  selector: 'app-configuracion-de-cuenta',
  templateUrl: './configuracion-de-cuenta.component.html',
  styleUrls: ['./configuracion-de-cuenta.component.css']
})
export class ConfiguracionDeCuentaComponent implements OnInit {
  public ReportesCabecera = ['Configuración de cuenta','/assets/img/icono-configuracion-usuario.svg']
  public formulario: FormGroup
  constructor(private servicioCabercera: ServicioCabeceraService) {
    this.servicioCabercera.actualizarTitulo(this.ReportesCabecera)
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      tipo_telefono: new FormControl('fijo', Validators.required),
      extension: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
      Correo: new FormControl(null, Validators.required),
      contrasena_actual: new FormControl('', Validators.required),
      contrasena_nueva: new FormControl('', Validators.required),
      confirmar_contrasena: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

}
