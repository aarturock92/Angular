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
    // pagination: Pagination;
}

export interface Predicate<T>{
    (item: T):boolean
}