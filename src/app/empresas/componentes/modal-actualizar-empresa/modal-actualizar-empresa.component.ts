import { Component, ElementRef, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresasService } from '../../servicios/empresas.service';
import { Empresa } from '../../modelos/Empresa';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';

@Component({
  selector: 'app-modal-actualizar-empresa',
  templateUrl: './modal-actualizar-empresa.component.html',
  styleUrls: ['./modal-actualizar-empresa.component.css']
})
export class ModalActualizarEmpresaComponent implements OnInit {
  @Output('empresaActualizada') empresaActualizada: EventEmitter<void>
  @ViewChild('modal') modal!: ElementRef
  @ViewChild('popup') popup!: PopupComponent

  formulario: FormGroup
  empresa?: Empresa

  constructor(private servicioModal: NgbModal, private servicioEmpresa: EmpresasService) {
    this.empresaActualizada = new EventEmitter<void>();
    this.formulario = new FormGroup({
      nombre: new FormControl<string | undefined>(undefined),
      nit: new FormControl<string | undefined>(undefined),
      convenio: new FormControl<string | undefined>(undefined),
      logo: new FormControl<File | null>(null)
    })
  }

  ngOnInit(): void {
  }

  public actualizarEmpresa(){
    if(this.formulario.invalid){
      console.error(this.formulario.controls)
      this.marcarFormularioComoSucio()
      throw Error('Formulario inválido')
    }
    const controls = this.formulario.controls
    this.servicioEmpresa.actualizarEmpresa(this.empresa!.id!, {
      nit: controls['nit'].value,
      nombre: controls['nombre'].value,
      convenio: controls['convenio'].value,
      logo: controls['logo'].value
    }).subscribe({
      complete: ()=> {
        this.popup.abrirPopupExitoso('Entidad actualizada con éxito.')
        this.empresaActualizada.emit()
        this.cerrar()
      },
      error: ()=> {
        this.popup.abrirPopupFallido('Error.', 'Hubo un error al momento de actualizar la entidad.')
      }
    })
  }

  public abrir(empresa: Empresa): void {
    this.limpiarFormulario()
    this.empresa = empresa
    this.rellenarFormulario(empresa)
    this.servicioModal.open(this.modal, {
      size: 'xl'
    })
  }
  
  public rellenarFormulario(empresa: Empresa){
    const controls = this.formulario.controls
    controls['nombre'].setValue(empresa.nombre)
    controls['nit'].setValue(empresa.nit)
    controls['convenio'].setValue(empresa.convenio)
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

  public cerrar(): void {
    this.servicioModal.dismissAll('Empresa creada');
  }

}
