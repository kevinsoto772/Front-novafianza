import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autenticable } from 'src/app/administrador/servicios/compartido/Autenticable';
import { environment } from 'src/environments/environment';
import { InformacionVariables } from '../modelos/InformacionVariables';

@Injectable({
  providedIn: 'root'
})
export class VariablesService extends Autenticable{
  private HOST = environment.urlBackend
  constructor(private http: HttpClient) { 
    super()
  }

  consultarVariablesArchivoEntidad(idEmpresa: string, idTipoArchivo: string){
    const endpoint = `/api/v1/archivo_empresa/variables?idEmpresa=${idEmpresa}&idArchivo=${idTipoArchivo}`
    return this.http.get<InformacionVariables>(
      `${this.HOST}${endpoint}`,
      { headers: { Authorization: `Bearer ${ this.obtenerTokenAutorizacion() }` } }
    )
  }
}
