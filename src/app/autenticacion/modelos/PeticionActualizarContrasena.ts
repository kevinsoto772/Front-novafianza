export class PeticionActualizarContrasena {
  clave: string;
  claveTemporal: boolean

  public constructor(clave: string, claveTemporal: boolean) {
    this.clave = clave
    this.claveTemporal = claveTemporal
}
}
