import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Autenticable } from './compartido/Autenticable';


const apiUrl = 'http://127.0.0.1:3333/api/v1'
@Injectable({
  providedIn: 'root'
})
export class CargarArchivosService extends Autenticable{
  private urlBackend:string
  headers: HttpHeaders;
  constructor(private httpClient: HttpClient) {
    super()
    this.urlBackend = environment.urlBackend
    this.headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.obtenerTokenAutorizacion()}`
    })
  }

  // public enviarArchivo(archivo:FormData, usuario:string):Observable<any>{
  //   const endpoint = `/api/v1/usuarios/${usuario}`
  //   return this.httpClient.post<string>(`${this.urlBackend}${endpoint}`, peticionActualizarUsuario, {headers: this.headers})
  // }
}
