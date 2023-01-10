import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from 'src/app/administrador/modelos/empresas/Empresa';
import { PeticionActualizarEmpresa } from 'src/app/administrador/modelos/empresas/PeticionActualizarEmpresa';
import { ServicioEmpresa } from 'src/app/administrador/servicios/empresas.service';
import { PopupComponent } from '../../../popup/popup.component';

@Component({
  selector: 'app-modal-actualizar-empresa',
  templateUrl: './modal-actualizar-empresa.component.html',
  styleUrls: ['./modal-actualizar-empresa.component.css']
})
export class ModalActualizarEmpresaComponent implements OnInit {
  @ViewChild('popup') popup!:PopupComponent
  @ViewChild('modalActualizarEmpresa') modalActualizarEmpresa!:ElementRef
  @Output('seHaActualizadoUnaEmpresa') seHaActualizadoUnaEmpresa: EventEmitter<void>
  public empresa?: Empresa;
  public formulario: FormGroup;


  constructor(private servicioModal: NgbModal, private servicioEmpresa: ServicioEmpresa) {
    this.seHaActualizadoUnaEmpresa = new EventEmitter<void>()
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      nit: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
  }

  public abrir(empresa: Empresa): void{
    this.empresa = empresa
    this.limpiarFormulario()
    this.servicioModal.open(this.modalActualizarEmpresa, {
      size: 'xl'
    })
    this.rellenarFormulario(empresa);
  }

  public cerrar():void{
    this.servicioModal.dismissAll()
  }

  public limpiarFormulario():void{
    this.formulario.reset()
  }

  public ActualizarEmpresa() {
    this.servicioEmpresa.ActualizarEmpresa(this.empresa!.id, new PeticionActualizarEmpresa(
      this.formulario.controls['nombre'].value,
      this.formulario.controls['nit'].value,
    )).subscribe((respuesta) => {
      this.seHaActualizadoUnaEmpresa.emit()
      this.limpiarFormulario()
      this.cerrar()
      this.popup.abrirPopupExitoso('Actualizado con éxito')
    }), (error: HttpErrorResponse) => {
      this.popup.abrirPopupFallido('Error')
    }

  }

  public rellenarFormulario(empresa:Empresa){
    this.formulario.reset()
    this.formulario.controls['nombre'].setValue(empresa.nombre)
    this.formulario.controls['nit'].setValue(empresa.nit)
  }

}

