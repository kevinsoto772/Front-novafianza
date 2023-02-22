import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup-procesando',
  templateUrl: './popup-procesando.component.html',
  styleUrls: ['./popup-procesando.component.css']
})
export class PopupProcesandoComponent implements OnInit {
  @ViewChild('modal') modal!: ElementRef
  @Output('cargarOtroArchivo') cargarOtroArchivo: EventEmitter<void>
  @Output('verHistorialDeNovedades') verHistorialDeNovedades: EventEmitter<void>
  constructor(private servicioModal: NgbModal) { 
    this.cargarOtroArchivo = new EventEmitter<void>()
    this.verHistorialDeNovedades = new EventEmitter<void>()
  }

  ngOnInit(): void {
  }

  abrir(){
    this.servicioModal.open(this.modal, {
      size: 'lg'
    })
  }

  manejarCargarOtroArchivo(){
    this.cargarOtroArchivo.emit()
    this.servicioModal.dismissAll()
  }

  manejarVerHistorialDeNovedades(){
    this.verHistorialDeNovedades.emit()
    this.servicioModal.dismissAll()
  }
}
