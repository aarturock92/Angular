export interface IUsuario{
    id: number,
    nombreUsuario: string,
    idRolUsuario: number,
    nombre: string,
    primerApellido: string,
    segundoApellido: string,
    sexo: number,
    calle: string,
    numeroExterior: string,
    numeroInterior: string,
    colonia: string,
    codigoPostal: string,
    idPais: number,
    idEstado: number,
    idMunicipio: number,
    email: string,
    telefonoOficina: string,
    extension: string,
    telefonoCasa: string,
    telefonoCelular: string,
    idZona: number,
    idPlaza: number,
    idGerencia: number,
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