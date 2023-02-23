import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Autenticable } from '../../administrador/servicios/compartido/Autenticable';
import { TipoArchivo } from '../modelos/TipoArchivo';

@Injectable({
  providedIn: 'root'
})
export class CargarArchivosService extends Autenticable {
  private readonly HOST: string
  constructor(private clienteHttp: HttpClient) {
    super()
    this.HOST = environment.urlBackend
  }

  obtenerTiposArchivo(){
    const endpoint = '/api/v1/archivo/listar'
    return this.clienteHttp.get<{archivos: TipoArchivo[]}>(
      `${this.HOST}${endpoint}`,
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } } 
    )
  }

  cargarArchivo(archivo: File, corte: { fechaInicial: string, fechaFinal: string }, tipoArchivo: string) {
    const endpoint = '/api/v1/cargas'
    const formData = new FormData()
    formData.append('archivo', archivo)
    formData.append('fechaInicial', corte.fechaInicial)
    formData.append('fechaFinal', corte.fechaFinal)
    formData.append('tipoArchivo', tipoArchivo)
    return this.clienteHttp.post(
      `${this.HOST}${endpoint}`, 
      formData,
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } }
    )
  }
}
