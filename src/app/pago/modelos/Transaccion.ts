export interface Transaccion {
  referencia: string,
  moneda: string,
  llavePublicaWompi: string,
  urlRedireccion: string,
  valorEnCentavos: number,
  datosUsuarios: datosUsuarios
}

export interface datosUsuarios {
  documento: string,
  tipoDocumento: string,
  telefono: string,
  valor: number,
  email:string
}
