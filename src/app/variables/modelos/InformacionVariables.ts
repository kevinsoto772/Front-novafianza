export interface InformacionVariables {
    Entidad:                 string;
    TipoProceso:             string;
    CantidadCampos:          number;
    ExtensionArchivo:        string;
    EstructuraNombreArchivo: string;
    Campos:                  Campo[];
    Respuesta:               Respuesta;
}

export interface Campo {
    NombreCampo:  string;
    Obligatorio:  string;
    Posicion:     number;
    FormatoFecha: string;
    TipoDato:     TipoDato;
}

export enum TipoDato {
    Number = "Number",
    String = "String",
}

export interface Respuesta {
    IdRetorno:      number;
    MensajeRetorno: string;
    TrazaError:     string;
}
