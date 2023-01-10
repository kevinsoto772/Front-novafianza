import { Component, OnInit } from '@angular/core';
import { ServicioCabeceraService } from 'src/app/administrador/servicios/servicio-cabecera.service';

@Component({
  selector: 'app-historial-novedades',
  templateUrl: './historial-novedades.component.html',
  styleUrls: ['./historial-novedades.component.css']
})
export class HistorialNovedadesComponent implements OnInit {
  public historialCabecera = ['Novedades','/assets/img/novedades.svg']

  constructor(private servicioCabercera: ServicioCabeceraService) {
    this.servicioCabercera.actualizarTitulo(this.historialCabecera)
  }

  ngOnInit(): void {
  }

}
