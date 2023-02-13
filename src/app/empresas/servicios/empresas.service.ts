import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autenticable } from 'src/app/administrador/servicios/compartido/Autenticable';
import { Paginacion } from 'src/app/compartido/modelos/Paginacion';
import { environment } from 'src/environments/environment';
import { Empresa } from '../modelos/Empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService extends Autenticable{
  private readonly HOST = environment.urlBackend;

  constructor(private clienteHttp: HttpClient) { 
    super()
  }

  obtenerEmpresas():Observable<{paginacion: Paginacion, empresas: Empresa[]}>{
    const endpoint = `/api/v1/empresa/listar/1/100`
    return this.clienteHttp.get<{paginacion: Paginacion, empresas: Empresa[]}>(
      `${this.HOST}${endpoint}`,
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}`} }
    )
  }
}
