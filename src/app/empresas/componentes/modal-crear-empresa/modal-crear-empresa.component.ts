import { Component, ElementRef, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresasService } from '../../servicios/empresas.service';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { Empresa } from '../../modelos/Empresa';

@Component({
  selector: 'app-modal-crear-empresa',
  templateUrl: './modal-crear-empresa.component.html',
  styleUrls: ['./modal-crear-empresa.component.css']
})
export class ModalCrearEmpresaComponent implements OnInit {
  @Output('empresaCreada') empresaCreada: EventEmitter<Empresa>
  @ViewChild('modal') modal!: ElementRef
  @ViewChild('popup') popup!: PopupComponent
  formulario: FormGroup

  constructor(private servicioModal: NgbModal, private servicioEmpresa: EmpresasService) {
    this.empresaCreada = new EventEmitter<Empresa>();
    this.formulario = new FormGroup({
      nombre: new FormControl<string>('', [Validators.required]),
      nit: new FormControl<string>('', [Validators.required]),
      convenio: new FormControl<string>('', [Validators.required]),
      logo: new FormControl<File | null>(null, [Validators.required]),
    })
  }

  ngOnInit(): void {
  }

  public crearEmpresa(){
    if(this.formulario.invalid){
      console.error(this.formulario.controls)
      this.marcarFormularioComoSucio()
      throw Error('Formulario inválido')
    }
    const controls = this.formulario.controls
    this.servicioEmpresa.crearEmpresa({
      convenio: controls['convenio'].value,
      estado: true,
      logo: controls['logo'].value,
      nit: controls['nit'].value,
      nombre: controls['nombre'].value
    }).subscribe({
      next: ( empresa )=> {
        this.cerrar()
        this.empresaCreada.emit( empresa )
        this.popup.abrirPopupExitoso('Entidad creada con éxito.')
      },
      error: ()=> {
        this.popup.abrirPopupFallido('Error', 'Algo salió mal en la creación de la entidad.')
      }
    })
  }

  public abrir(): void {
    this.limpiarFormulario()
    this.servicioModal.open(this.modal, {
      size: 'xl'
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

  public cerrar(): void {
    this.servicioModal.dismissAll('Empresa creada');
  }

}
