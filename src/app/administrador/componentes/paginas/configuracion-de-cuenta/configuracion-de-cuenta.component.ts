import { Component, OnInit } from '@angular/core';
import { ServicioCabeceraService } from 'src/app/administrador/servicios/servicio-cabecera.service';

@Component({
  selector: 'app-configuracion-de-cuenta',
  templateUrl: './configuracion-de-cuenta.component.html',
  styleUrls: ['./configuracion-de-cuenta.component.css']
})
export class ConfiguracionDeCuentaComponent implements OnInit {
  public ReportesCabecera = ['Configuración de cuenta','/assets/img/icono-configuracion-usuario.svg']

  constructor(private servicioCabercera: ServicioCabeceraService) {
    this.servicioCabercera.actualizarTitulo(this.ReportesCabecera)
  }

  ngOnInit(): void {
  }

}
