import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autenticable } from 'src/app/administrador/servicios/compartido/Autenticable';
import { Paginacion } from 'src/app/compartido/modelos/Paginacion';
import { environment } from 'src/environments/environment';
import { ArchivoCargado } from '../modelos/ArchivoCargado';
import { NovedadesArchivo, Registro } from '../modelos/NovedadesArchivo';
import { ServicioLocalStorage } from 'src/app/administrador/servicios/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NovedadesService extends Autenticable {
  private readonly HOST = environment.urlBackend;

  constructor(private clienteHttp: HttpClient, private servicioLocalStorage:ServicioLocalStorage) {
    super()
  }

  obtenerArchivosCargados(pagina: number = 1, limite: number = 5, idEmpresa: string) {
    const usuario = this.servicioLocalStorage.obtenerUsuario()
    const endpoint = `/api/v1/cargas?entidadId=${idEmpresa}&pagina=${pagina}&limite=${limite}`
    return this.clienteHttp.get<{ archivosCargados: ArchivoCargado[], paginacion: Paginacion }>(
      `${this.HOST}${endpoint}`,
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } }
    )
  }

  obtenerDetalleArchivo(idArchivoCargado: string){
    const endpoint = `/api/v1/cargas/logs?id=${idArchivoCargado}`
    return this.clienteHttp.get<NovedadesArchivo>(
      `${this.HOST}${endpoint}`,
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } }
    )
  }

  paginarRegistros(pagina: number, limite: number, registros: Registro[]):Observable<{registros: Registro[], paginacion: Paginacion}>{
    return new Observable( subscriptor => {
      const paginacion: Paginacion = {
        paginaActual: pagina,
        totalRegistros: registros.length,
        totalPaginas: Math.ceil(registros.length / limite),
      }
      const indiceInicial = (pagina - 1) * limite
      const registrosPaginados = registros.slice(indiceInicial, indiceInicial + limite )
      subscriptor.next({
        paginacion: paginacion,
        registros: registrosPaginados
      })
      subscriptor.complete()
    })
  }
}
