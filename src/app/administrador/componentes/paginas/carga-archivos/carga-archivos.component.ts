import { Component, OnInit } from '@angular/core';
import { ServicioCabeceraService } from 'src/app/administrador/servicios/servicio-cabecera.service';

@Component({
  selector: 'app-carga-archivos',
  templateUrl: './carga-archivos.component.html',
  styleUrls: ['./carga-archivos.component.css']
})
export class CargaArchivosComponent implements OnInit {
  public archivosCabecera = ['Carga de archivos', '/assets/img/icono-archivos-blanco.svg']

  constructor(private servicioCabercera: ServicioCabeceraService) {
    this.servicioCabercera.actualizarTitulo(this.archivosCabecera)
  }

  ngOnInit(): void {
  }

}
