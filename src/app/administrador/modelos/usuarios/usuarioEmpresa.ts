export interface UsuarioEmpresa {
  id?: string;
  usuario: string;
  identificacion: number;
  nombre: string;
  apellido: string;
  fechaNacimiento:string;
  cargo: string;
  correo: string;
  telefono: string;
  estado?: boolean;
  clave?: string;
  idEmpresa: string;
  claveTemporal?: boolean;
  idRol: string
}
