import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SafePipe } from 'src/app/safe.pipe';

@Component({
  selector: 'app-modal-visualizar-manual',
  templateUrl: './modal-visualizar-manual.component.html',
  styleUrls: ['./modal-visualizar-manual.component.css']
})
export class ModalVisualizarManualComponent implements OnInit {
  @ViewChild('modal') modal!: ElementRef
  url?: string

  constructor(private servicioModal: NgbModal) { }

  ngOnInit(): void {
  }

  abrir(url: string){
    this.url =  url
    this.servicioModal.open(this.modal, {
      size: 'xl'
    })
  }
}
