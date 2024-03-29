export class Empresa {
    private _id: string | undefined;
    private _nombre: string;
    private _nit: string;
    private _estado: boolean;
	private _convenio: string;
	private _createdAt?: string; // viene en formato ISO

	constructor(nombre: string, nit: string, estado: boolean, convenio: string, id?: string, creado?: string) {
		this._id = id;
		this._nombre = nombre;
		this._convenio = convenio;
		this._nit = nit;
		this._estado = estado;
		this._createdAt = creado;
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

	public get convenio(): string{
		return this._convenio
	}

	public get createdAt(): string | undefined{
		return this._createdAt
	}

    public get estado(): boolean {
		return this._estado;
	}
	public set estado(estado: boolean){
		this._estado = estado
	}
}