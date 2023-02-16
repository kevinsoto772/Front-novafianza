import { Component, ElementRef, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresasService } from '../../servicios/empresas.service';

@Component({
  selector: 'app-modal-crear-empresa',
  templateUrl: './modal-crear-empresa.component.html',
  styleUrls: ['./modal-crear-empresa.component.css']
})
export class ModalCrearEmpresaComponent implements OnInit {
  @Output('empresaCreada') empresaCreada: EventEmitter<void>
  @ViewChild('modal') modal!: ElementRef
  formulario: FormGroup

  constructor(private servicioModal: NgbModal, private servicioEmpresa: EmpresasService) {
    this.empresaCreada = new EventEmitter<void>();
    this.formulario = new FormGroup({
      nombre: new FormControl<string>('', [Validators.required]),
      nit: new FormControl<string>('', [Validators.required]),
      convenio: new FormControl<string>(''),
      logo: new FormControl<string>('', [Validators.required]),
      recursoLogo: new FormControl<string>('', [Validators.required])
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
      convenio: 1,
      estado: true,
      logo: controls['recursoLogo'].value,
      nit: controls['nit'].value,
      nombre: controls['nombre'].value
    }).subscribe({
      complete: ()=> {
        this.empresaCreada.emit()
      },
      error: ()=> {}
    })
  }

  public abrir(): void {
    this.limpiarFormulario()
    this.servicioModal.open(this.modal, {
      size: 'xl'
    })
  }

  public obtenerArchivo(evento: Event) {
    if(!evento.target){
      throw Error('El target del evento no es un input')
    }
    const input = evento.target as HTMLInputElement
    this.formulario.patchValue({ recursoLogo: input.files ? input.files.item(0) : undefined })
    console.log(this.formulario.value)
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
