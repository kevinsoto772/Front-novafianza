export class Empresa {
    private _id: string | undefined;
    private _nombre: string;
    private _nit: string;
    private _estado: boolean;

	constructor(nombre: string, nit: string, estado: boolean, id?: string) {
		this._id = id;
		this._nombre = nombre;
		this._nit = nit;
		this._estado = estado;
	}
    
	public get id(): string | undefined {
		return this._id;
	}

    public get nombre(): string {
		return this._nombre;
	}

    public get nit(): string {
		return this._nit;
	}

    public get estado(): boolean {
		return this._estado;
	}
}