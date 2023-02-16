export interface NovedadesArchivo {
    nombreArchivo:     string;
    cargadoPor:        string;
    fechaYHora:        Date;
    fechaCorteFinal:   Date;
    fechaCorteInicial: Date;
    validaciones:      Validacion[];
}

export interface Validacion {
    nombre:    string;
    novedades: Novedad[];
}

export interface Novedad {
    nombre:     string;
    categorias: Categoria[];
}

export interface Categoria {
    nombre:    string;
    registros: Registro[];
}

export interface Registro {
    descripcion: string;
    linea:       string;
    variable:    string;
}
