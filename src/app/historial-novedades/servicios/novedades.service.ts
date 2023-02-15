import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autenticable } from 'src/app/administrador/servicios/compartido/Autenticable';
import { Paginacion } from 'src/app/compartido/modelos/Paginacion';
import { environment } from 'src/environments/environment';
import { ArchivoCargado } from '../modelos/ArchivoCargado';
import { NovedadesArchivo } from '../modelos/NovedadesArchivo';

@Injectable({
  providedIn: 'root'
})
export class NovedadesService extends Autenticable {
  private readonly HOST = environment.urlBackend;

  constructor(private clienteHttp: HttpClient) {
    super()
  }

  obtenerArchivosCargados(idEmpresa: string, pagina: number = 1, limite: number = 5) {
    const usuario = localStorage.getItem('usuario')
    console.log(usuario)
    const endpoint = `/api/v1/cargas?usuario=0000000&pagina=${pagina}&limite=${limite}`
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
}
