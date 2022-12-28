import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioUsuarios } from 'src/app/administrador/servicios/usuarios.service';
import { PeticionActualizarContrasena } from '../../modelos/PeticionActualizarContrasena';
import { PopupComponent } from '../popup/popup.component';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-actualizar-contrasena',
  templateUrl: './actualizar-contrasena.component.html',
  styleUrls: ['./actualizar-contrasena.component.css']
})
export class ActualizarContrasenaComponent implements OnInit {
  @ViewChild('popup') popup!: PopupComponent
  public formulario: FormGroup
  public readonly llaveIdUsuarioLocalStorage = 'idUsuario'



  constructor(private enrutador: Router, private servicioUsuarios: ServicioUsuarios, private servicioAutenticacion:AutenticacionService) {
    this.formulario = new FormGroup({
      nueva_contrasena: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#_<>^~`()])([A-Za-z\d$@$!%*?&]|[^ ]){8,100}$/)]),
      confirmmar_contrasena: new FormControl('', [Validators.required]),
    })
    }

  ngOnInit(): void {
  }

  actualizarContrasena() {
    if (this.formulario.controls['nueva_contrasena'].value === this.formulario.controls['confirmmar_contrasena'].value) {
      let UsuarioId = localStorage.getItem(this.llaveIdUsuarioLocalStorage)
      this.servicioUsuarios.ActualizarContraseñaUsuarioEmpresa(UsuarioId!, new PeticionActualizarContrasena(
        this.formulario.controls['nueva_contrasena'].value, false
      )).subscribe((respuesta) => {
        this.popup.abrirPopupExitoso('Contraseña actualizada con éxito')
        this.limpiarFormulario()
        this.cerrarSesion()
      }), (error: HttpErrorResponse) => {
        this.popup.abrirPopupFallido('Error')
      }
    }

  }

  public limpiarFormulario():void{
    this.formulario.reset()
  }

  public cerrarSesion(){
    this.servicioAutenticacion.cerrarSesion();
    this.enrutador.navigateByUrl('/inicio-sesion')
  }

}
