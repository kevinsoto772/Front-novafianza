import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-detalles-archivo',
  templateUrl: './modal-detalles-archivo.component.html',
  styleUrls: ['./modal-detalles-archivo.component.css']
})
export class ModalDetallesArchivoComponent implements OnInit {
  @ViewChild('modal') modal!:ElementRef

  constructor(private servicioModal: NgbModal) { }

  ngOnInit(): void {

  }

  abrir(){
    this.servicioModal.open(this.modal, {
      size: 'xl'
    })
  }

  cerrar(){
    this.servicioModal.dismissAll('click-cerrar')
  } 

}
