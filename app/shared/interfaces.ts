export interface IUser{
    id:number,
    name:string,
    avatar:string,
    profession:string,
    schedulesCreated: number
}


export interface ISchedule{
    id: number,
    title: string,
    description: string,
    timeStart: Date,
    timeEnd: Date,
    location: string,
    type: string,
    status: string,
    dateCreated: Date,
    dateUpdated: Date,
    creator: string,
    creatorId: number,
    attendees: number[]
}


export interface IScheduleDetails{
    id: number,
    title:string,
    description: string,
    timeStart:Date,
    timeEnd: Date,
    location: string,
    type: string,
    status: string,
    dateCreated: Date,
    dateUpdated: Date,
    creator: string,
    creatorId: number,
    attendes: IUser[],
    statuses: string[],
    types: string[]
}


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