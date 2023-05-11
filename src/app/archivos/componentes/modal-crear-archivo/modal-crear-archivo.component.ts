import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CargarArchivosService } from '../../servicios/cargar-archivos.service';
import { FormatoArchivo } from '../../modelos/FormatoArchivo';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';

@Component({
  selector: 'app-modal-crear-archivo',
  templateUrl: './modal-crear-archivo.component.html',
  styleUrls: ['./modal-crear-archivo.component.css']
})
export class ModalCrearArchivoComponent implements OnInit {
  @ViewChild('modal') modal!: ElementRef
  @ViewChild('popup') popup!: PopupComponent
  formulario: FormGroup
  formatosArchivo: FormatoArchivo[] = []

  constructor(private servicioModal: NgbModal, private servicioArchivos: CargarArchivosService) { 
    this.formulario = new FormGroup({
      nombre: new FormControl<string>('', [ Validators.required ]),
      formato: new FormControl<string>('', [ Validators.required ]),
      descripcion: new FormControl<string>('', [ Validators.required ]),
      manual: new FormControl<string>('', [ Validators.required ]),
    })
  }

  ngOnInit(): void {
    this.obtenerFormatosArchivo(1, 100)
  }

  crearTipoArchivo(){
    const controles = this.formulario.controls
    this.servicioArchivos.crearTipoArchivo({
      descripcion: controles['descripcion'].value,
      formatoId: controles['formato'].value,
      nombre: controles['nombre'].value,
    }).subscribe({
      next: ()=>{
        this.popup.abrirPopupExitoso('Servicio creado correctamente.')
      }
    })
  }

  obtenerFormatosArchivo(pagina: number, limite: number){
    this.servicioArchivos.obtenerFormatosArchivo(pagina, limite).subscribe({
      next: (respuesta)=>{
        this.formatosArchivo = respuesta.formatosArchivos
      }
    })
  }

  abrir(){
    this.servicioModal.open(this.modal, {
      size: 'xl',
      centered: false
    })
  }

}
