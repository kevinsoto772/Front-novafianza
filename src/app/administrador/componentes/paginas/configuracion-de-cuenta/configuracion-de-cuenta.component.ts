import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioCabeceraService } from 'src/app/administrador/servicios/servicio-cabecera.service';
import { ServicioUsuarios } from 'src/app/administrador/servicios/usuarios.service';
import { PeticionActualizarContrasena } from 'src/app/autenticacion/modelos/PeticionActualizarContrasena';
import { PeticionActualizarUsuario } from '../../../modelos/ConfiguracionPerfil/PeticionActualizarUsuario';
import { PopupComponent } from '../../../../alertas/componentes/popup/popup.component';

@Component({
  selector: 'app-configuracion-de-cuenta',
  templateUrl: './configuracion-de-cuenta.component.html',
  styleUrls: ['./configuracion-de-cuenta.component.css']
})
export class ConfiguracionDeCuentaComponent implements OnInit {
  @ViewChild('popup') popup!: PopupComponent
  public ReportesCabecera = ['Configuración de cuenta', '/assets/img/icono-configuracion-usuario.svg']
  public formularioNombre: FormGroup;
  public formularioContacto: FormGroup;
  public formularioContrasena: FormGroup;
  public readonly llaveUsuarioLocalStorage = 'Usuario'
  constructor(private servicioCabercera: ServicioCabeceraService, private servicioUsuario: ServicioUsuarios) {
    this.servicioCabercera.actualizarTitulo(this.ReportesCabecera)

    this.formularioNombre = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
    })

    this.formularioContacto = new FormGroup({
      tipo_telefono: new FormControl('movil', Validators.required),
      extension: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
      telefono_fijo: new FormControl(null, Validators.required),
      Correo: new FormControl(null, Validators.required),
    })

    this.formularioContrasena = new FormGroup({
      contrasena_actual: new FormControl('', Validators.required),
      contrasena_nueva: new FormControl('', Validators.required),
      confirmar_contrasena: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    const Usuario = JSON.parse(localStorage.getItem(this.llaveUsuarioLocalStorage)!)
    this.formularioNombre.controls['nombre'].setValue(Usuario.nombre)
    this.formularioNombre.controls['apellido'].setValue(Usuario.apellido)
    this.formularioContacto.controls['telefono'].setValue(Usuario.telefono)
    this.formularioContacto.controls['Correo'].setValue(Usuario.correo)
  }

  public actualizarUsuario() {
    const Usuario = JSON.parse(localStorage.getItem(this.llaveUsuarioLocalStorage)!)
    this.servicioUsuario.actualizarUsuario(new PeticionActualizarUsuario(
      this.formularioNombre.controls['nombre'].value,
      this.formularioNombre.controls['apellido'].value,
      this.formularioContacto.controls['telefono'].value ? (this.formularioContacto.controls['telefono'].value).toString() : undefined,
      this.formularioContacto.controls['Correo'].value,
    ), Usuario.usuario).subscribe((respuesta) => {
      this.popup.abrirPopupExitoso('Se actualizaron los datos con éxito')
    }, (error: HttpErrorResponse) => {
      this.popup.abrirPopupFallido('Error')
    })
  }

  actualizarContrasena() {
    if (this.formularioContrasena.controls['contrasena_nueva'].value === this.formularioContrasena.controls['confirmar_contrasena'].value) {
      let usuario = localStorage.getItem(this.llaveUsuarioLocalStorage)
      const Usuario = JSON.parse(usuario!)
      this.servicioUsuario.ActualizarContraseñaUsuario(new PeticionActualizarContrasena(
        Usuario.usuario!,
        this.formularioContrasena.controls['contrasena_actual'].value,
        this.formularioContrasena.controls['contrasena_nueva'].value
      )).subscribe((respuesta) => {
        this.popup.abrirPopupExitoso('Se actualizaron los datos con éxito')
        this.limpiarFormulario()
      }), (error: HttpErrorResponse) => {
        this.popup.abrirPopupFallido('Error')
      }
    }
  }

  public limpiarFormulario():void{
    this.formularioContrasena.reset()
  }

}
