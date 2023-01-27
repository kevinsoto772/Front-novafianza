import { Rol } from "./Rol"

export interface IniciarSesionRespuesta {
  usuario: usuario
  token: string
  claveTemporal: boolean
  rol: Rol
}

export interface usuario {
  id: string
  usuario: string
  nombre: string
  apellido:string
  telefono: string
  correo: string
}
