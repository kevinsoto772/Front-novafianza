import { Component, OnInit } from '@angular/core';
import { ServicioCabeceraService } from 'src/app/administrador/servicios/servicio-cabecera.service';

@Component({
  selector: 'app-pagina-reportes',
  templateUrl: './pagina-reportes.component.html',
  styleUrls: ['./pagina-reportes.component.css']
})
export class PaginaReportesComponent implements OnInit {
  public ReportesCabecera = ['Reportes','assets/img/icono-reportes-blanco.svg']

  constructor(private servicioCabercera: ServicioCabeceraService) { }

  ngOnInit(): void {
    this.servicioCabercera.actualizarTitulo(this.ReportesCabecera )
  }

}
