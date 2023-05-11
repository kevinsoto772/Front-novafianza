import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { CargarArchivosService } from '../../servicios/cargar-archivos.service';
import { TipoArchivo } from '../../modelos/TipoArchivo';
import { FormatoArchivo } from '../../modelos/FormatoArchivo';

@Component({
  selector: 'app-modal-actualizar-archivo',
  templateUrl: './modal-actualizar-archivo.component.html',
  styleUrls: ['./modal-actualizar-archivo.component.css']
})
export class ModalActualizarArchivoComponent implements OnInit {
  @ViewChild('modal') modal!: ElementRef
  @ViewChild('popup') popup!: PopupComponent
  archivo?: TipoArchivo
  formulario: FormGroup
  formatosArchivo: FormatoArchivo[] = []

  constructor(private servicioModal: NgbModal, private servicioArchivos: CargarArchivosService) { 
    this.formulario = new FormGroup({
      nombre: new FormControl<string>('', [ Validators.required ]),
      descripcion: new FormControl<string>('', [ Validators.required ]),
      formato: new FormControl<string>('', [ Validators.required ]),
      manual: new FormControl<string>('', []),
    })
  }

  actualizarTipoArchivo(){
    const controles = this.formulario.controls
    this.servicioArchivos.actualizarTipoArchivo(this.archivo!.id, {
      descripcion: controles['descripcion'].value,
      formatoId: controles['formato'].value,
      nombre: controles['nombre'].value
    }).subscribe({
      next: ()=> {
        this.popup.abrirPopupExitoso('Se ha actualizado el servicio exitosamente.')
      }
    })
  }

  ngOnInit(): void {
    this.obtenerFormatosArchivo(1, 100)
  }

  obtenerFormatosArchivo(pagina: number, limite: number){
    this.servicioArchivos.obtenerFormatosArchivo(pagina, limite).subscribe({
      next: (respuesta)=>{
        this.formatosArchivo = respuesta.formatosArchivos
      }
    })
  }

  abrir(archivo: TipoArchivo)
  {
    this.rellenarFormulario(archivo)
    this.archivo = archivo
    this.servicioModal.open(this.modal, {
      size: 'xl',
      centered: false
    })
  }

  limpiarFormulario(){
    this.formulario.reset()
  }

  rellenarFormulario(archivo: TipoArchivo){
    this.limpiarFormulario()
    const controles = this.formulario.controls
    controles['nombre'].setValue(archivo.nombre)
    controles['descripcion'].setValue(archivo.descripcion)
    controles['formato'].setValue(archivo.formatoId)
  }

}
