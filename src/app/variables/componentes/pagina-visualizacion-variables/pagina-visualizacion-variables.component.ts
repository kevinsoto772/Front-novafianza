import { Component, OnInit } from '@angular/core';
import { ServicioLocalStorage } from 'src/app/administrador/servicios/local-storage.service';
import { ServicioCabeceraService } from 'src/app/administrador/servicios/servicio-cabecera.service';
import { Usuario } from 'src/app/autenticacion/modelos/IniciarSesionRespuesta';
import { VariablesService } from '../../servicios/variables.service';
import { Campo } from '../../modelos/InformacionVariables';
import { Paginador } from 'src/app/administrador/modelos/compartido/Paginador';
import { Paginacion } from 'src/app/compartido/modelos/Paginacion';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagina-visualizacion-variables',
  templateUrl: './pagina-visualizacion-variables.component.html',
  styleUrls: ['./pagina-visualizacion-variables.component.css']
})
export class PaginaVisualizacionVariablesComponent implements OnInit {
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
        this.todasLasVariables = informacion.Campos
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
