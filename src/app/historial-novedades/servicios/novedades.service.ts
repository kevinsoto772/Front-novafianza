import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autenticable } from 'src/app/administrador/servicios/compartido/Autenticable';
import { Paginacion } from 'src/app/compartido/modelos/Paginacion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NovedadesService extends Autenticable{
  private readonly HOST = environment.urlBackend;

  constructor(private clienteHttp: HttpClient) { 
    super()
  }

  obtenerArchivosCargados(idEmpresa: string, pagina: number = 1, limite: number = 5){
    const endpoint = ""
    return this.clienteHttp.get(
      `${this.HOST}${endpoint}`,
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}`} }
    )
  }
}
