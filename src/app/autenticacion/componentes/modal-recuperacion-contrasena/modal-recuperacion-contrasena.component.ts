import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-recuperacion-contrasena',
  templateUrl: './modal-recuperacion-contrasena.component.html',
  styleUrls: ['./modal-recuperacion-contrasena.component.css']
})
export class ModalRecuperacionContrasenaComponent implements OnInit {
  @ViewChild('modal') modal!:ElementRef
  constructor(private servicioModal: NgbModal) { }

  ngOnInit(): void {
  }

  public abrir():void{
    this.servicioModal.open(this.modal, {
      size: 'lg'
    })
  }
}
