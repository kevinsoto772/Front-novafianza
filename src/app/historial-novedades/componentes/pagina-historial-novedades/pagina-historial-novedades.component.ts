import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDetallesArchivoComponent } from '../modal-detalles-archivo/modal-detalles-archivo.component';

@Component({
  selector: 'app-pagina-historial-novedades',
  templateUrl: './pagina-historial-novedades.component.html',
  styleUrls: ['./pagina-historial-novedades.component.css']
})
export class PaginaHistorialNovedadesComponent implements OnInit {
  @ViewChild('modalVerDetalles') modalDetallesArchivo!:ModalDetallesArchivoComponent
  constructor() { }

  ngOnInit(): void {
  }

  abrirModalVerDetallesArchivo(){
    this.modalDetallesArchivo.abrir()
  }

}
