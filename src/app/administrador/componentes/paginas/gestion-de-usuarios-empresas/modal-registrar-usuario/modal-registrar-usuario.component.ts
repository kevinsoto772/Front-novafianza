import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from 'src/app/administrador/componentes/popup/popup.component';
import { PeticionRegistrarEmpresa } from 'src/app/administrador/modelos/empresas/PeticionRegistrarEmpresa';
import { ServicioEmpresa } from 'src/app/administrador/servicios/empresas.service';

@Component({
  selector: 'app-modal-registrar-usuario',
  templateUrl: './modal-registrar-usuario.component.html',
  styleUrls: ['./modal-registrar-usuario.component.css']
})
export class ModalRegistrarUsuarioComponent implements OnInit {
  @ViewChild('popup') popup!:PopupComponent
  @ViewChild('modalRegistroUsuario') modalRegistroUsuario!: ElementRef
  @Output('seHaRegistradoUnUsuario') seHaRegistradoUnUsuario:EventEmitter<void>
  public formulario:FormGroup



  constructor(private servicioModal: NgbModal, private servicioEmpresa: ServicioEmpresa) {
    this.seHaRegistradoUnUsuario = new EventEmitter<void>()
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      numeroDocumento: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      tipoDocumento: new FormControl('', [Validators.required]),
      tipoTelefono: new FormControl('movil', Validators.required),
      extension: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      telefonoFijo: new FormControl('', Validators.required),
      Correo: new FormControl('', Validators.required),
      cargo: new FormControl('', [Validators.required]),
      tipoRol: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
  }

  public abrir():void{
    this.limpiarFormulario()
    this.servicioModal.open(this.modalRegistroUsuario, {
      size: 'xl'
    })
  }

  public cerrar():void{
    this.servicioModal.dismissAll('Usuario creado');
  }


  public registrarEmpresa(){
    if(this.formulario.invalid){
      this.popup.abrirPopupFallido('Formulario Inválido', 'Rellena correctamente todos los campos.')
      this.marcarFormularioComoSucio()
    }
    if(this.formulario.valid){
        // this.servicioEmpresa.registrarEmpresa(new PeticionRegistrarEmpresa(
        //   this.formulario.controls['nombre'].value,
        //   this.formulario.controls['nit'].value,
        // )).subscribe((respuesta:any)=>{
        //   this.seHaRegistradoUnUsuario.emit()
        //   this.popup.abrirPopupExitoso('Empresa registrada con éxito', 'Nombre', this.formulario.controls['nombre'].value)
        //   this.limpiarFormulario()
        //   this.cerrar();
        // }, (error:HttpErrorResponse)=>{
        //   this.popup.abrirPopupFallido('Error')
        // })
    }
  }


  public limpiarFormulario(){
    this.formulario.reset()
  }

  public marcarFormularioComoSucio():void{
    (<any>Object).values(this.formulario.controls).forEach((control:FormControl) => {
      control.markAsDirty();
      if (control) {
        control.markAsDirty()
      }
    });
  }


}
