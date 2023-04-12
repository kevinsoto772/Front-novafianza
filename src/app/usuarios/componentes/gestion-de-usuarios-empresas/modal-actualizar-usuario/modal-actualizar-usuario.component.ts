import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { UsuarioEmpresa } from 'src/app/administrador/modelos/usuarios/usuarioEmpresa';
import { ServicioUsuarios } from 'src/app/administrador/servicios/usuarios.service';
import { DateTime } from 'luxon';
import { marcarFormularioComoSucio } from 'src/app/administrador/utilidades/Utilidades';
import { soloUnoEntre } from 'src/app/usuarios/validadores/AlMenosUno';
import { Rol } from 'src/app/autenticacion/modelos/Rol';
import { ServicioLocalStorage } from 'src/app/administrador/servicios/local-storage.service';
import { Cargo } from 'src/app/administrador/modelos/usuarios/Cargo';
import { requeridoSi } from 'src/app/usuarios/validadores/RequeridoSi';

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
  public rolUsuario: Rol | null
  cargos: Cargo[] = []

  constructor(private servicioModal: NgbModal, private servicioUsuarioEmpresa: ServicioUsuarios, private servicioLocalStorage: ServicioLocalStorage) {
    this.seHaActualizadoUnUsuario = new EventEmitter<void>()
    this.rolUsuario = this.servicioLocalStorage.obtenerRol()
    this.formulario = new FormGroup({
      nombre: new FormControl<string>('', [Validators.required]),
      apellido: new FormControl<string>('', [Validators.required]),
      numeroDocumento: new FormControl<string>('', [Validators.required]),
      fechaNacimiento: new FormControl<string>('', [Validators.required]),
      tipoDocumento: new FormControl<string>('', [Validators.required]),
      tipoTelefono: new FormControl<string>('movil', Validators.required),
      extension: new FormControl<string>(''),
      telefono: new FormControl<string>('', Validators.required),
      telefonoFijo: new FormControl<string>(''),
      correo: new FormControl<string>('', Validators.required),
      cargo: new FormControl<string>('', [Validators.required]),
      otroCargo       : new FormControl<string | undefined>(undefined, [requeridoSi('cargo', '99cb025b-2bfd-412c-bb81-b979a14f5644')]),
      tipoRol: new FormControl<string>('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.servicioUsuarioEmpresa.obtenerCargos().subscribe({
      next: (cargos) => {
        this.cargos = cargos
      }
    })
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
      console.log(this.formulario.controls)
      throw Error('Formulario inválido')
    }
    const controls = this.formulario.controls

    this.servicioUsuarioEmpresa.ActualizarUsuarioEmpresa(this.usuarioEmpresa!.id!, {
      nombre: controls['nombre'].value,
      apellido: controls['apellido'].value,
      cargo: controls['cargo'].value,
      otroCargo: controls['otroCargo'].value,
      correo: controls['correo'].value,
      fechaNacimiento: controls['fechaNacimiento'].value,
      identificacion: controls['numeroDocumento'].value,
      celular: controls['telefono'].value,
      telefono: controls['telefonoFijo'].value,
      extension: controls['extension'].value,
      idRol: controls['tipoRol'].value
    }).subscribe({
      next: ()=> { 
        this.popup.abrirPopupExitoso('Se ha actualizado el usuario con éxito') 
        this.cerrar()
        this.seHaActualizadoUnUsuario.emit()
      },
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
    controls['tipoTelefono'].setValue('movil')
    controls['extension'].setValue(usuarioEmpresa.extension)
    controls['telefono'].setValue(usuarioEmpresa.celular)
    controls['telefonoFijo'].setValue(usuarioEmpresa.telefono)
    controls['correo'].setValue(usuarioEmpresa.correo)
    controls['cargo'].setValue(usuarioEmpresa.cargo)
    controls['otroCargo'].setValue(usuarioEmpresa.otroCargo)
    controls['tipoRol'].setValue(usuarioEmpresa.idRol)
  }

  manejarCambioCargo(){
    const controls = this.formulario.controls
    controls['otroCargo'].setValue('')
  }

}

