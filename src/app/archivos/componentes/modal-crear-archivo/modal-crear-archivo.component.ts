import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-crear-archivo',
  templateUrl: './modal-crear-archivo.component.html',
  styleUrls: ['./modal-crear-archivo.component.css']
})
export class ModalCrearArchivoComponent implements OnInit {
  @ViewChild('modal') modal!: ElementRef
  formulario: FormGroup
  constructor(private servicioModal: NgbModal) { 
    this.formulario = new FormGroup({
      nombre: new FormControl<string>('', [ Validators.required ]),
      descipcion: new FormControl<string>('', [ Validators.required ]),
      manual: new FormControl<string>('', [ Validators.required ]),
      recursoManual: new FormControl<File | undefined>(undefined, [ Validators.required ])
    })
  }

  ngOnInit(): void {
  }

  abrir(){
    this.servicioModal.open(this.modal, {
      size: 'xl',
      centered: false
    })
  }

}
