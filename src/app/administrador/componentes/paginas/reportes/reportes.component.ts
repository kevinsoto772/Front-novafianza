import { Component, OnInit } from '@angular/core';
import { ServicioCabeceraService } from 'src/app/administrador/servicios/servicio-cabecera.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  public ReportesCabecera = ['Reportes','assets/img/icono-reportes-blanco.svg']


  constructor(private servicioCabercera: ServicioCabeceraService) {
    this.servicioCabercera.actualizarTitulo(this.ReportesCabecera )
  }

  ngOnInit(): void {
  }

}
