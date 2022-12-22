export interface Rol {
  _id: string;
  _nombre: string;
  _estado: boolean;
  _creacion: Date;
  _actualizacion: Date
  _modulos: Modulo[]
}

export interface Modulo{
  _id: string;
  _nombre: string;
  _ruta: string;
  _icono: string;
  _estado: boolean;
  _creacion: Date;
  _actualizacion: Date;
}

