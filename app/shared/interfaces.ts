export interface IUsuario{
    id: number,
    idPerfilUsuario: number, 
    numeroEmpleado: string,
    nombre: string,
    primerApellido: string,
    segundoApellido: string,
    sexo: number,
    telefono: string,
    email: string,
    curp: string,
    rfc: string,
    fechaNacimiento: string, 
    nombreUsuario: string,
    calle: string,
    numeroExterior: string,
    colonia: string,
    codigoPostal: string,
    idPais: number,
    idEstado: number,
    idMunicipio: number,
    imagen: string,
    estatus: number
}

export interface IMovil{
    id:number,
    idRegion: number,
    idPlazaImmex: number,
    marca: string,
    modelo: string, 
    numeroTelefono: string,
    numeroSerie: string, 
    imei: string, 
    idEstatus: number
}

export interface IEstado{
    id: number,
    nombre: string,
    abreviatura: string,
    status: number,
    municipios:  IMunicipio[]
}

export interface IMunicipio{
    id: number,
    nombre: string,
    estatus: number,
    idEstado: number
}

export interface IPerfilUsuario{
    id:number,
    nombre: string,
    descripcion: string,
    idJerarquia: number,
    asignacionMultiple: boolean,
    estatus: number
}


export interface Pagination{
    CurrentPage: number,
    ItemsPerPage: number,
    TotalItems: number,
    TotalPages: number
}

export class PaginatedResult<T>{
    result: T;
    page: number;
    count: number;
    totalPages: number;
    totalCount: number
}

export interface Predicate<T>{
    (item: T):boolean
}