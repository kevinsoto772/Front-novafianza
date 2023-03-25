import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicioLocalStorage } from 'src/app/administrador/servicios/local-storage.service';
import { ServicioCabeceraService } from 'src/app/administrador/servicios/servicio-cabecera.service';
import { Usuario } from 'src/app/autenticacion/modelos/IniciarSesionRespuesta';
import { VariablesService } from '../../servicios/variables.service';
import { Campo } from '../../modelos/InformacionVariables';
import { Paginador } from 'src/app/administrador/modelos/compartido/Paginador';
import { Paginacion } from 'src/app/compartido/modelos/Paginacion';
import { Observable } from 'rxjs';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pagina-visualizacion-variables',
  templateUrl: './pagina-visualizacion-variables.component.html',
  styleUrls: ['./pagina-visualizacion-variables.component.css']
})
export class PaginaVisualizacionVariablesComponent implements OnInit {
  @ViewChild('popup') popup!: PopupComponent
  usuario: Usuario | null
  idEmpresa?: string
  idTipoArchivo?: string
  variablesPaginadas: Campo[] = []
  todasLasVariables: Campo[] = []
  paginador: Paginador

  constructor(
    private servicioLocalStorage: ServicioLocalStorage,
    private servicioCabecera: ServicioCabeceraService,
    private servicioVariables: VariablesService
  ) {
    this.paginador = new Paginador(this.paginarVariables)
    this.usuario = this.servicioLocalStorage.obtenerUsuario()
    if (this.usuario && this.usuario.idEmpresa) {
      this.idEmpresa = this.usuario.idEmpresa
    }
  }

  ngOnInit(): void {
  }

  obtenerTodasLasVariables(idEmpresa: string, idTipoArchivo: string) {
    this.servicioVariables.consultarVariablesArchivoEntidad(idEmpresa, idTipoArchivo).subscribe({
      next: (informacion) => {
        //ordenando por posicion
        this.todasLasVariables = informacion.Campos.sort( (variable1, variable2) => Number(variable1.Posicion) - Number(variable2.Posicion) )
        this.paginador.inicializarPaginacion(undefined, undefined, this.todasLasVariables)
      },
      error: (error: HttpErrorResponse) => {
        if(error.status === 404){
          this.popup.abrirPopupFallido('Estructura no encontrada.', 'No se encontró estructura definida para este archivo y entidad.')
        }
        if(error.status === 503){
          this.popup.abrirPopupFallido('Servicio no disponible.', 'En este momento el servicio no está disponible.')
        }
        this.todasLasVariables = []
        this.variablesPaginadas = []
        this.paginador.inicializarPaginacion(undefined, undefined, this.todasLasVariables)
      }
    })
  }

  paginarVariables = (pagina: number, limite: number, variables: Campo[]) => {
    return new Observable<Paginacion>(subscriptor => {
      const paginacion: Paginacion = {
        paginaActual: pagina,
        totalRegistros: variables.length,
        totalPaginas: Math.ceil(variables.length / limite),
      }
      const indiceInicial = (pagina - 1) * limite
      this.variablesPaginadas = variables.slice(indiceInicial, indiceInicial + limite)
      subscriptor.next(paginacion)
      subscriptor.complete()
    })
  }

  manejarSeleccion(idEmpresa: string, idTipoArchivo: string) {
    if (this.usuario?.idEmpresa) {
      this.idTipoArchivo = idTipoArchivo
    } else {
      this.idEmpresa = idEmpresa
      this.idTipoArchivo = idTipoArchivo
    }
    this.obtenerTodasLasVariables(this.idEmpresa!, this.idTipoArchivo!)
  }
}
