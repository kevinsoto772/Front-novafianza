import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NovedadesArchivo } from '../../modelos/NovedadesArchivo';

@Component({
  selector: 'app-modal-detalles-archivo',
  templateUrl: './modal-detalles-archivo.component.html',
  styleUrls: ['./modal-detalles-archivo.component.css']
})
export class ModalDetallesArchivoComponent implements OnInit {
  @ViewChild('modal') modal!:ElementRef
  detallesArchivo?: NovedadesArchivo
  idArchivoCargado?: string

  constructor(private servicioModal: NgbModal) { }

  ngOnInit(): void {

  }

  abrir(detallesArchivo: NovedadesArchivo, idArchivoCargado: string){
    this.detallesArchivo = detallesArchivo
    this.idArchivoCargado = idArchivoCargado
    this.servicioModal.open(this.modal, {
      size: 'xl'
    })
  }

  cerrar(){
    this.servicioModal.dismissAll('click-cerrar')
  } 

}
