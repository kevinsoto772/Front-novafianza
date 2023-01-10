export class PeticionRealizarTransaccion  {
  documento: string;
  tipoDocumento: string;
  telefono: string;
  valor: number;
  email: string;

  public constructor(documento:string, tipoDocumento: string, telefono:string, valor:number, email:string){
    this.documento = documento
    this.tipoDocumento = tipoDocumento
    this.telefono = telefono
    this.valor = valor
    this.email = email
}
}
