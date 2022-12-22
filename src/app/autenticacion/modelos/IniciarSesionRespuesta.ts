import { Rol } from "./Rol"

export interface IniciarSesionRespuesta {
  usuario: string
  nombre: string
  expira: number
  token: string
  claveTemporal: boolean
  id: string
  rol: Rol
}


