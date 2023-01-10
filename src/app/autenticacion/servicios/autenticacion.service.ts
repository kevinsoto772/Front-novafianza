import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IniciarSesionRespuesta } from '../modelos/IniciarSesionRespuesta';
import { PeticionRecuperarContrasena } from '../modelos/PeticionRecuperarContrasena';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private urlBackend: string
  headers: HttpHeaders;
  public readonly llaveTokenLocalStorage = 'jwt'
  public readonly llaveExpiraLocalStorage = 'expira'
  public readonly llaveNombreUsuarioLocalStorage = 'nombreUsuario'
  public readonly llaveUsuarioLocalStorage = 'Usuario'
  public readonly llaveIdUsuarioLocalStorage = 'idUsuario'
  public readonly llaveRolesLocalStorage = 'rol'


  constructor(private clientHttp:HttpClient) {
    this.urlBackend = environment.urlBackend
    this.headers = new HttpHeaders({
      "Content-Type": "application/json",
    })
  }

  public iniciarSesion(documento:string, clave:string):Observable<IniciarSesionRespuesta>{
    const endpoint = '/api/v1/autenticacion/inicio-sesion/empresa'
    return this.clientHttp.post<IniciarSesionRespuesta>(`${this.urlBackend}${endpoint}`, {usuario: documento, contrasena: clave})
  }

  public recuperarContraseña(informacionUsuario:PeticionRecuperarContrasena): Observable<string>{
    const endpoint = '/api/v1/envio-email'
    return this.clientHttp.post<string>(`${this.urlBackend}${endpoint}`, informacionUsuario,)
  }

  public cerrarSesion(){
    localStorage.removeItem(this.llaveUsuarioLocalStorage)
    localStorage.removeItem(this.llaveExpiraLocalStorage)
    localStorage.removeItem(this.llaveNombreUsuarioLocalStorage)
    localStorage.removeItem(this.llaveTokenLocalStorage)
    localStorage.removeItem(this.llaveIdUsuarioLocalStorage)
    localStorage.removeItem(this.llaveRolesLocalStorage)
  }

  public guardarInformacionInicioSesion(jwt:string, expira:number, nombreUsuario:string, idUsuario: string, rol:object, Usuario: string):void{
    console.log('Guardando Información de inicio de sesión')
    console.log('Nuevo token', jwt)
    const diferenciaDeMilisegundos = expira * 60 * 1000;
    const fechaActual = new Date().getTime()
    const fechaExpiracion = new Date(fechaActual + diferenciaDeMilisegundos)

    localStorage.setItem(this.llaveNombreUsuarioLocalStorage, nombreUsuario)
    localStorage.setItem(this.llaveExpiraLocalStorage, fechaExpiracion.getTime().toString())
    localStorage.setItem(this.llaveTokenLocalStorage, jwt),
    localStorage.setItem(this.llaveIdUsuarioLocalStorage, idUsuario)
    localStorage.setItem(this.llaveRolesLocalStorage, JSON.stringify(rol))
    localStorage.setItem(this.llaveUsuarioLocalStorage, Usuario)

  }
}
