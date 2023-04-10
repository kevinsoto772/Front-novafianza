import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autenticable } from 'src/app/administrador/servicios/compartido/Autenticable';
import { Paginacion } from 'src/app/compartido/modelos/Paginacion';
import { environment } from 'src/environments/environment';
import { Empresa } from '../modelos/Empresa';
import { PeticionCrearEmpresa } from '../modelos/PeticionCrearEmpresa';
import { PeticionActualizarEmpresa } from 'src/app/administrador/modelos/empresas/PeticionActualizarEmpresa';
import { ArchivoEmpresa } from 'src/app/archivos/modelos/ArchivoEmpresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService extends Autenticable {
  private readonly HOST = environment.urlBackend;

  constructor(private clienteHttp: HttpClient) {
    super()
  }

  obtenerEmpresas(pagina: number, limite: number): Observable<{ paginacion: Paginacion, empresas: Empresa[] }> {
    const endpoint = `/api/v1/empresa/listar/${pagina}/${limite}`
    return this.clienteHttp.get<{ paginacion: Paginacion, empresas: Empresa[] }>(
      `${this.HOST}${endpoint}`,
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } }
    )
  }

  crearEmpresa(peticion: PeticionCrearEmpresa) {
    const formData = new FormData()
    formData.append('nombre', peticion.nombre)
    formData.append('nit', peticion.nit)
    formData.append('estado', 'true')
    formData.append('convenio', peticion.convenio.toString())
    formData.append('logo', peticion.logo)
    const endpoint = `/api/v1/empresa/registro`
    return this.clienteHttp.post<Empresa>(
      `${this.HOST}${endpoint}`,
      formData,
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } }
    )
  }

  actualizarEmpresa(idEmpresa: string, peticion: PeticionActualizarEmpresa) {
    const endpoint = `/api/v1/empresa/${idEmpresa}`
    const formData = new FormData()
    for(const propiedad in peticion){
      const valor = peticion[propiedad as keyof PeticionActualizarEmpresa]
      if(valor){
        if(typeof valor === 'boolean' || typeof valor === 'number'){
          formData.append(propiedad, valor.toString())
          continue;
        }
        formData.append(propiedad, valor)
      }
    }
    
    return this.clienteHttp.patch<Empresa>(
      `${this.HOST}${endpoint}`,
      formData,
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } }
    )
  }

  cambiarEstadoEmpresa(idEmpresa: string) {
    const endpoint = `/api/v1/empresa/estado/${idEmpresa}`
    return this.clienteHttp.put<Empresa>(
      `${this.HOST}${endpoint}`,
      undefined,
      { headers: { Authorization: `Bearer ${ this.obtenerTokenAutorizacion() }` } }
    )
  }

  asignarArchivos(idEmpresa: string, idArchivos: string[]){
    const endpoint = '/api/v1/archivo_empresa/registro-multiple'
    return this.clienteHttp.post(
      `${this.HOST}${endpoint}`,
      {
        idEmpresa,
        idArchivos
      },
      { headers: { Authorization: `Bearer ${ this.obtenerTokenAutorizacion() }` } }
    )
  }

  vincularManual(idArchivo: string, idEmpresa: string, manual: File){
    const endpoint = '/api/v1/archivo_empresa/vincular-manual'
    const formulario = new FormData()
    formulario.append('idArchivo', idArchivo)
    formulario.append('idEmpresa', idEmpresa)
    formulario.append('manual', manual)
    return this.clienteHttp.post(
      `${this.HOST}${endpoint}`,
      formulario,
      { headers: { Authorization: `Bearer ${ this.obtenerTokenAutorizacion() }` } }
    )
  }

  listarArchivos(idEmpresa: string){
    const endpoint = `/api/v1/archivo_empresa/listar_por_empresa/${idEmpresa}`
    return this.clienteHttp.get<ArchivoEmpresa[]>(
      `${this.HOST}${endpoint}`,
      { headers: { Authorization: `Bearer ${ this.obtenerTokenAutorizacion() }` } }
    )
  }
}
