import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from 'src/app/administrador/modelos/empresas/Empresa';
import { PeticionActualizarEmpresa } from 'src/app/administrador/modelos/empresas/PeticionActualizarEmpresa';
import { ServicioEmpresa } from 'src/app/administrador/servicios/empresas.service';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { UsuarioEmpresa } from 'src/app/administrador/modelos/usuarios/usuarioEmpresa';
import { Usuario } from 'src/app/autenticacion/modelos/IniciarSesionRespuesta';
import { ServicioUsuarios } from 'src/app/administrador/servicios/usuarios.service';
import { DateTime } from 'luxon';
import { marcarFormularioComoSucio } from 'src/app/administrador/utilidades/Utilidades';

@Component({
  selector: 'app-modal-actualizar-usuario',
  templateUrl: './modal-actualizar-usuario.component.html',
  styleUrls: ['./modal-actualizar-usuario.component.css']
})
export class ModalActualizarUsuarioComponent implements OnInit {
  @ViewChild('popup') popup!:PopupComponent
  @ViewChild('modalActualizarUsuario') modalActualizarUsuario!:ElementRef
  @Output('seHaActualizadoUnUsuario') seHaActualizadoUnUsuario: EventEmitter<void>
  public usuarioEmpresa?: UsuarioEmpresa;
  public formulario: FormGroup;


  constructor(private servicioModal: NgbModal, private servicioUsuarioEmpresa: ServicioUsuarios) {
    this.seHaActualizadoUnUsuario = new EventEmitter<void>()
    this.formulario = new FormGroup({
      nombre: new FormControl<string>('', [Validators.required]),
      apellido: new FormControl<string>('', [Validators.required]),
      numeroDocumento: new FormControl<string>('', [Validators.required]),
      fechaNacimiento: new FormControl<string>('', [Validators.required]),
      tipoDocumento: new FormControl<string>('', [Validators.required]),
      tipoTelefono: new FormControl<string>('movil', Validators.required),
      extension: new FormControl<string>('', Validators.required),
      telefono: new FormControl<string>('', Validators.required),
      telefonoFijo: new FormControl<string>('', Validators.required),
      correo: new FormControl<string>('', Validators.required),
      cargo: new FormControl<string>('', [Validators.required]),
      tipoRol: new FormControl<string>('', [Validators.required]),
    })
  }

  ngOnInit(): void {
  }

  public abrir(usuario: UsuarioEmpresa): void{
    this.usuarioEmpresa = usuario
    this.limpiarFormulario()
    this.servicioModal.open(this.modalActualizarUsuario, {
      size: 'xl'
    })
    this.rellenarFormulario(usuario);
  }

  public cerrar():void{
    this.servicioModal.dismissAll()
  }

  public limpiarFormulario():void{
    this.formulario.reset()
  }

  public actualizarUsuarioEmpresa() {
    if(this.formulario.invalid){
      this.popup.abrirPopupFallido('Formulario inválido', 'Rellena correctamente todos los campos')
      marcarFormularioComoSucio(this.formulario)
      throw Error('Formulario inválido')
    }
    const controls = this.formulario.controls

    this.servicioUsuarioEmpresa.ActualizarUsuarioEmpresa(this.usuarioEmpresa!.id!, {
      nombre: controls['nombre'].value,
      apellido: controls['apellido'].value,
      cargo: controls['cargo'].value,
      correo: controls['correo'].value,
      fechaNacimiento: controls['fechaNacimiento'].value,
      identificacion: controls['numeroDocumento'].value,
      telefono: controls['telefono'].value,
      idRol: controls['tipoRol'].value
    }).subscribe({
      complete: ()=> { this.popup.abrirPopupExitoso('Se ha actualizado el usuario con éxito') },
      error: ()=> { this.popup.abrirPopupFallido('Error', 'Ha habido un error al momento de actualizar.') }
    })
  }

  public rellenarFormulario(usuarioEmpresa:UsuarioEmpresa){
    this.formulario.reset()
    const controls = this.formulario.controls
    controls['nombre'].setValue(usuarioEmpresa.nombre)
    controls['apellido'].setValue(usuarioEmpresa.apellido)
    controls['nombre'].setValue(usuarioEmpresa.nombre)
    controls['apellido'].setValue(usuarioEmpresa.apellido)
    controls['numeroDocumento'].setValue(usuarioEmpresa.identificacion)
    controls['fechaNacimiento'].setValue(
      DateTime.fromISO(usuarioEmpresa.fechaNacimiento).toFormat('yyyy-MM-dd') 
    )
    controls['tipoDocumento'].setValue('CC')
    controls['tipoTelefono'].setValue(usuarioEmpresa.telefono)
    controls['extension'].setValue('')
    controls['telefono'].setValue(usuarioEmpresa.telefono)
    controls['telefonoFijo'].setValue(usuarioEmpresa.telefono)
    controls['correo'].setValue(usuarioEmpresa.correo)
    controls['cargo'].setValue(usuarioEmpresa.cargo)
    controls['tipoRol'].setValue(usuarioEmpresa.idRol)
  }

}

