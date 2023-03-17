import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { ServicioUsuarios } from 'src/app/administrador/servicios/usuarios.service';
import { ServicioLocalStorage } from 'src/app/administrador/servicios/local-storage.service';
import { Rol } from 'src/app/autenticacion/modelos/Rol';

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
  rolUsuario: Rol | null

  constructor(private servicioModal: NgbModal, private servicioUsuarios: ServicioUsuarios, private servicioLocalStorage: ServicioLocalStorage) {
    this.seHaRegistradoUnUsuario = new EventEmitter<void>()
    this.rolUsuario = this.servicioLocalStorage.obtenerRol()
    this.formulario = new FormGroup({
      nombre          : new FormControl<string | undefined>(undefined, [Validators.required]),
      apellido        : new FormControl<string | undefined>(undefined, [Validators.required]),
      numeroDocumento : new FormControl<string | undefined>(undefined, [Validators.required]),
      fechaNacimiento : new FormControl<string | undefined>(undefined, [Validators.required]),
      tipoDocumento   : new FormControl<string | undefined>(undefined, [Validators.required]),
      tipoTelefono    : new FormControl<string | undefined>('movil', Validators.required),
      extension       : new FormControl<string | undefined>(undefined),
      telefonoFijo    : new FormControl<string | undefined>(undefined),
      telefono        : new FormControl<string | undefined>(undefined, Validators.required),
      correo          : new FormControl<string | undefined>(undefined, Validators.required),
      cargo           : new FormControl<string | undefined>(undefined, [Validators.required]),
      tipoRol         : new FormControl<string | undefined>(undefined, [Validators.required]),
    })
  }

  ngOnInit(): void {
  }

  public abrir(empresaId: string): void {
    this.empresaId = empresaId
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

    this.servicioUsuarios.registrarUsuarioEmpresa({
      nombre: controls['nombre'].value,
      identificacion: controls['numeroDocumento'].value,
      apellido: controls['apellido'].value,
      fechaNacimiento: controls['fechaNacimiento'].value,
      cargo: controls['cargo'].value,
      correo: controls['correo'].value,
      celular: controls['telefono'].value,
      idEmpresa: this.empresaId!,
      idRol: controls['tipoRol'].value,
      extension: controls['extension'].value,
      telefono: controls['telefonoFijo'].value
    }
      
    ).subscribe({
      complete: () => {
        this.seHaRegistradoUnUsuario.emit()
        this.popup.abrirPopupExitoso('Usuario creado con éxito')
      },
      error: () => { this.popup.abrirPopupFallido('Error') }
    })
  }


  public limpiarFormulario() {
    this.formulario.reset()
    this.rellenarFormulario()
  }

  rellenarFormulario() {
    const controls = this.formulario.controls
    controls['tipoTelefono'].setValue('movil')
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
