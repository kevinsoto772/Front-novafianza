import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from 'src/app/administrador/modelos/empresas/Empresa';
import { ServicioEmpresa } from 'src/app/administrador/servicios/empresas.service';

@Component({
  selector: 'app-modal-ver-empresa',
  templateUrl: './modal-ver-empresa.component.html',
  styleUrls: ['./modal-ver-empresa.component.css']
})
export class ModalVerEmpresaComponent implements OnInit {
  @ViewChild('modalverEmpresa') modalverEmpresa!: ElementRef
  public empresa?: Empresa;
  public formulario: FormGroup;

  constructor(private servicioModal: NgbModal) {
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      nit: new FormControl('', [Validators.required]),
      Estado: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
  }

  public abrir(empresa: Empresa): void{
    this.empresa = empresa
    this.limpiarFormulario()
    this.servicioModal.open(this.modalverEmpresa, {
      size: 'lg'
    })
    this.rellenarFormulario(empresa);
    console.log(this.empresa.estado)
  }

  public cerrar():void{
    this.servicioModal.dismissAll('Usuario creado');
  }

  public limpiarFormulario():void{
    this.formulario.reset()
  }

  public rellenarFormulario(empresa:Empresa){
    this.formulario.reset()
    this.formulario.controls['nombre'].setValue(empresa.nombre)
    this.formulario.controls['nit'].setValue(empresa.nit)
    this.formulario.controls['Estado'].setValue('Activa')
    if (empresa.estado == true) {
      this.formulario.controls['Estado'].setValue('Activa')
        } else {
        this.formulario.controls['Estado'].setValue('Inactiva')
          }
  }

}
