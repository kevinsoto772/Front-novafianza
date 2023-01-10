import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConsultaDeuda } from '../modelos/consultaDeuda';
import { PeticionRealizarTransaccion } from '../modelos/PeticionRealizarTransaccion';
import { Transaccion } from '../modelos/Transaccion';

@Injectable({
  providedIn: 'root'
})
export class WompiService {
  private urlBackend: string
  headers: HttpHeaders;
  public readonly llavePublicaWPStorage = 'pkw'

  constructor(private clientHttp: HttpClient) {
    this.urlBackend = environment.urlBackend
    this.headers = new HttpHeaders({
      "Content-Type": "application/json",
    })
  }

  public consultarDeuda(documento:string, tipoDocumento:string):Observable<ConsultaDeuda>{
    const endpoint = '/api/v1/pagos/consultar'
    return this.clientHttp.post<ConsultaDeuda>(`${this.urlBackend}${endpoint}`, {documento: documento, tipoDocumento: tipoDocumento})
  }

  public transaccion(peticionPagar:PeticionRealizarTransaccion):Observable<Transaccion>{
    const endpoint = '/api/v1/pagos/transaccion'
    return this.clientHttp.post<Transaccion>(`${this.urlBackend}${endpoint}`,peticionPagar, {headers: this.headers})
  }

  public consultaTransaccion(idTransaccion:string){
    const endpoint = `https://sandbox.wompi.co/v1/transactions/${idTransaccion}`
    return this.clientHttp.get(`${endpoint}`)
  }

  public guardarInformacionWompi(llavePublica:string):void{
    localStorage.setItem(this.llavePublicaWPStorage, llavePublica)
  }

}
