export class PeticionRegistrarUsuarioEmpresa {
  public identificacion: number;
  public nombre: string;
  public apellido: string;
  public fechaNacimiento: Date;
  public cargo: string;
  public correo: string;
  public telefono: string;
  public idEmpresa: string;
  public idRol: string

  public constructor(nombre: string, identificacion: number, apellido: string, fechaNacimiento: Date, cargo: string, correo: string, telefono: string, idEmpresa: string, idRol: string) {
    this.nombre = nombre
    this.identificacion = identificacion
    this.apellido = apellido
    this.fechaNacimiento = fechaNacimiento
    this.cargo = cargo
    this.correo = correo
    this.telefono = telefono
    this.idEmpresa = idEmpresa
    this.idRol = idRol
}
}
