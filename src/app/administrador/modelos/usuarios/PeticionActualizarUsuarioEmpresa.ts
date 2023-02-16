export class PeticionActualizarUsuarioEmpresa {
  public identificacion: number;
  public nombre?: string;
  public apellido?: string;
  public fechaNacimiento?: Date;
  public cargo?: string;
  public correo?: string;
  public telefono?: string;
  public idEmpresa?: string;
  public clave?: string;
  public clave_temportal?: boolean
  public idRol?: string;

  public constructor(nombre: string, identificacion: number, apellido: string, fechaNacimiento: Date, cargo: string, correo: string, telefono: string, idEmpresa: string,
    idRol: string, clave: string, clave_temportal: boolean) {
    this.nombre = nombre
    this.identificacion = identificacion
    this.apellido = apellido
    this.fechaNacimiento = fechaNacimiento
    this.cargo = cargo
    this.correo = correo
    this.telefono = telefono
    this.clave = clave
    this.clave_temportal = clave_temportal
    this.idEmpresa = idEmpresa
    this.idRol = idRol
}
}
