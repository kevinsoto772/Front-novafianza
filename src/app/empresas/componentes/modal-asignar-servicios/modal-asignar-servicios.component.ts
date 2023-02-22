import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-asignar-servicios',
  templateUrl: './modal-asignar-servicios.component.html',
  styleUrls: ['./modal-asignar-servicios.component.css']
})
export class ModalAsignarServiciosComponent implements OnInit {
  @ViewChild('modal') modal!: ElementRef  
  formulario: FormGroup
  constructor(private servicioModal: NgbModal) { 
    this.formulario = new FormGroup({})
  }

  ngOnInit(): void {
  }

  abrir(){
    this.servicioModal.open(this.modal, {
      size: 'xl'
    })
  }

}
