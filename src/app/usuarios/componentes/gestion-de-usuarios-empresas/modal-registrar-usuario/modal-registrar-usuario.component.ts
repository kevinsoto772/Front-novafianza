import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { UsuarioEmpresa } from 'src/app/administrador/modelos/usuarios/usuarioEmpresa';
import { ServicioUsuarios } from 'src/app/administrador/servicios/usuarios.service';

@Component({
  selector: 'app-modal-registrar-usuario',
  templateUrl: './modal-registrar-usuario.component.html',
  styleUrls: ['./modal-registrar-usuario.component.css']
})
export class ModalRegistrarUsuarioComponent implements OnInit {
  @ViewChild('popup') popup!: PopupComponent
  @ViewChild('modalRegistroUsuario') modalRegistroUsuario!: ElementRef
  @Output('seHaRegistradoUnUsuario') seHaRegistradoUnUsuario: EventEmitter<void>
  formulario: FormGroup
  empresaId?: string

  constructor(private servicioModal: NgbModal, private servicioUsuarios: ServicioUsuarios) {
    this.seHaRegistradoUnUsuario = new EventEmitter<void>()
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

  public abrir(empresaId: string): void {
    this.limpiarFormulario()
    this.servicioModal.open(this.modalRegistroUsuario, {
      size: 'xl'
    })
  }

  public cerrar(): void {
    this.servicioModal.dismissAll('Usuario creado');
  }


  public registrarUsuarioEmpresa() {
    if (this.formulario.invalid) {
      this.popup.abrirPopupFallido('Formulario Inválido', 'Rellena correctamente todos los campos.')
      this.marcarFormularioComoSucio()
      console.error(this.formulario.controls)
      throw Error('Formulario inválido')
    }
    const controls = this.formulario.controls
    const usuarioEmpresa: UsuarioEmpresa = {
      identificacion: controls['numeroDocumento'].value,
      nombre: controls['nombre'].value,
      apellido: controls['apellido'].value,
      cargo: controls['cargo'].value,
      correo: controls['correo'].value,
      fechaNacimiento: controls['fechaNacimiento'].value,
      telefono: controls['telefono'].value,
      idEmpresa: this.empresaId!,
      idRol: controls['tipoRol'].value,
      usuario: controls['numeroDocumento'].value
    }
    this.servicioUsuarios.registrarUsuarioEmpresa(usuarioEmpresa).subscribe({
      complete: () => { 
        this.seHaRegistradoUnUsuario.emit() 
        this.popup.abrirPopupExitoso('Usuario creado con éxito')
      },
      error: () => { this.popup.abrirPopupFallido('Error') }
    })
  }


  public limpiarFormulario() {
    this.formulario.reset()
  }

  public marcarFormularioComoSucio(): void {
    (<any>Object).values(this.formulario.controls).forEach((control: FormControl) => {
      control.markAsDirty();
      if (control) {
        control.markAsDirty()
      }
    });
  }


}
