import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paginacion } from '../modelos/compartido/Paginador';
import { PeticionActualizarUsuarioEmpresa } from '../modelos/usuarios/PeticionActualizarUsuarioEmpresa';
import { PeticionRegistrarUsuarioEmpresa } from '../modelos/usuarios/PeticionRegistrarUsuarioEmpresa';
import { usuarioEmpresa } from '../modelos/usuarios/usuarioEmpresa';
import { Autenticable } from './compartido/Autenticable';
import { PeticionActualizarContrasena } from '../../autenticacion/modelos/PeticionActualizarContrasena';
import { usuarioNovafianza } from '../modelos/usuarios/usuarioNovafianza';

const apiUrl = 'http://127.0.0.1:3333/api/v1'
@Injectable({
  providedIn: 'root'
})
export class ServicioUsuarios extends Autenticable {
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

  obtenerUsuariosEmpresa(pagina: number, limite: number): Observable<{usuariosEmpresa: usuarioEmpresa[], paginacion:Paginacion}> {
    const endpoint = `/api/v1/usuario_empresa/listar/${pagina}/${limite}`
    return this.httpClient.get<{usuariosEmpresa: usuarioEmpresa[], paginacion:Paginacion}>(`${this.urlBackend}${endpoint}`, { headers: this.headers });
  }

  obtenerUsuarioEmpresaPorId(usuariosEmpresa_id: string): Observable<usuarioEmpresa>{
    const endpoint = `/api/v1/usuario_empresa/${usuariosEmpresa_id}`;
    return this.httpClient.get<usuarioEmpresa>(`${this.urlBackend}${endpoint}`, {headers: this.headers});
  }

  obtenerUsuarioEmpresaPorUsuario(nombreUsuario: string): Observable<usuarioEmpresa>{
    const endpoint = `/api/v1/usuario_empresa/usuario/${nombreUsuario}`;
    return this.httpClient.get<usuarioEmpresa>(`${this.urlBackend}${endpoint}`, {headers: this.headers});
  }

  obtenerUsuarioNovafianzaPorUsuario(nombreUsuario: string): Observable<usuarioNovafianza>{
    const endpoint = `/api/v1/usuario_novafianza/usuario/${nombreUsuario}`;
    return this.httpClient.get<usuarioNovafianza>(`${this.urlBackend}${endpoint}`, {headers: this.headers});
  }


  registrarUsuarioEmpresa(usuarioEmpresa: PeticionRegistrarUsuarioEmpresa): Observable<void>{
    const endpoint = `/api/v1/usuario_empresa/registro`
    return this.httpClient.post<void>(`${this.urlBackend}${endpoint}`, usuarioEmpresa, {headers: this.headers})
  }

  public ActualizarUsuarioEmpresa(usuariosEmpresa_id:string, usuarioEmpresa:PeticionActualizarUsuarioEmpresa): Observable<string>{
    const endpoint = `/api/v1/usuario_empresa/${usuariosEmpresa_id}`;
    return this.httpClient.patch<string>(`${this.urlBackend}${endpoint}`, usuarioEmpresa, {headers: this.headers})
  }

  public ActualizarContrase??aUsuario(usuarioEmpresa:PeticionActualizarContrasena): Observable<string>{
    const endpoint = `/api/v1/autenticacion/cambiar-clave`;
    return this.httpClient.post<string>(`${this.urlBackend}${endpoint}`, usuarioEmpresa, {headers: this.headers})
  }

  public cambiarEstadoUsuarioEmpresa(usuariosEmpresa_id:string):Observable<any>{
    const endpoint = `/api/v1/usuario_empresa/estado/${usuariosEmpresa_id}`
    return this.httpClient.put<any>(`${this.urlBackend}${endpoint}`,{headers: this.headers})
  }
}
