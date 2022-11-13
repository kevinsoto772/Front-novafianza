import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from 'src/app/administrador/componentes/popup/popup.component';
import { PeticionRegistrarEmpresa } from 'src/app/administrador/modelos/empresas/PeticionRegistrarEmpresa';
import { ServicioEmpresa } from 'src/app/administrador/servicios/empresas.service';

@Component({
  selector: 'app-modal-registrar-empresa',
  templateUrl: './modal-registrar-empresa.component.html',
  styleUrls: ['./modal-registrar-empresa.component.css']
})
export class ModalRegistrarEmpresaComponent implements OnInit {
  @ViewChild('popup') popup!:PopupComponent
  @ViewChild('modalRegistroEmpresa') modalRegistroEmpresa!: ElementRef
  @Output('seHaRegistradoUnaEmpresa') seHaRegistradoUnaEmpresa:EventEmitter<void>
  public formulario:FormGroup



  constructor(private servicioModal: NgbModal, private servicioEmpresa: ServicioEmpresa) {
    this.seHaRegistradoUnaEmpresa = new EventEmitter<void>()
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      nit: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
  }

  public abrir():void{
    this.limpiarFormulario()
    this.servicioModal.open(this.modalRegistroEmpresa, {
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
        this.servicioEmpresa.registrarEmpresa(new PeticionRegistrarEmpresa(
          this.formulario.controls['nombre'].value,
          this.formulario.controls['nit'].value,
        )).subscribe((respuesta:any)=>{
          this.seHaRegistradoUnaEmpresa.emit()
          this.popup.abrirPopupExitoso('Empresa registrada con éxito', 'Nombre', this.formulario.controls['nombre'].value)
          this.limpiarFormulario()
          this.cerrar();
        }, (error:HttpErrorResponse)=>{
          this.popup.abrirPopupFallido('Error')
        })
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
