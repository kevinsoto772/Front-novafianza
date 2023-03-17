import { Component, OnInit } from '@angular/core';
import { ServicioLocalStorage } from 'src/app/administrador/servicios/local-storage.service';
import { ServicioCabeceraService } from 'src/app/administrador/servicios/servicio-cabecera.service';
import { Usuario } from 'src/app/autenticacion/modelos/IniciarSesionRespuesta';

@Component({
  selector: 'app-pagina-visualizacion-variables',
  templateUrl: './pagina-visualizacion-variables.component.html',
  styleUrls: ['./pagina-visualizacion-variables.component.css']
})
export class PaginaVisualizacionVariablesComponent implements OnInit {
  usuario: Usuario | null
  idEmpresa?: string

  constructor(
    private servicioLocalStorage: ServicioLocalStorage,
    private servicioCabecera: ServicioCabeceraService
  ) { 
    this.usuario = servicioLocalStorage.obtenerUsuario()
    if(this.usuario && this.usuario.idEmpresa){
      this.idEmpresa = this.usuario.idEmpresa
    }
  }

  ngOnInit(): void {
  }

  manejarCambioDeEmpresa(idEmpresa: string){

  }
}
