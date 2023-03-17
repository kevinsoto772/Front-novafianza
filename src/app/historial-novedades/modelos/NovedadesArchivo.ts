export interface NovedadesArchivo {
    nombreArchivo:     string;
    cargadoPor:        string;
    fechaYHora:        string;
    fechaCorteFinal:   string;
    fechaCorteInicial: string;
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
    numero: number;
    descripcion: string;
    linea:       string;
    variable:    string;
}
