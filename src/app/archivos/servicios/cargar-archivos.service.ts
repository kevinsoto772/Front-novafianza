import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Autenticable } from '../../administrador/servicios/compartido/Autenticable';
import { DateTime } from 'luxon'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargarArchivosService extends Autenticable {
  private urlBackend: string
  headers: HttpHeaders;
  constructor(private httpClient: HttpClient) {
    super()
    this.urlBackend = environment.urlBackend
    this.headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.obtenerTokenAutorizacion()}`
    })
  }

  cargarArchivo(archivo: File, corte: { fechaInicial: DateTime, fechaFinal: DateTime }, tipoArchivo: string) {
    return new Observable<HttpResponse<undefined>>((subscritor) => {
      subscritor.next(new HttpResponse({ status: 200 }))
    })
  }
}
