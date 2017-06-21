export interface IRegion{
    id:number,
    idNegocio: string,
    claveRegion: string,
    nombreRegion: string,
    estatus: number,
    plazasImmex: IPlazaImmex[]
}

export interface IPlazaImmex{
    id:number,
    regionId: number,
    crPlazaImmex: string,
    nombrePlazaImmex: string,
    estatus: number,
    plazasOxxo: IPlazaOxxo[]
}

export interface IPlazaOxxo{
    id:number,
    crPlazaOxxo: string,
    nombrePlazaOxxo: string,
    estatus: number,
    distritos: IDistrito[]
}

export interface IDistrito{
    id:number, 
    claveDistrito: string,
    nombreDistrito: string,
    estatus: number,
    tiendas: ITienda[]
}

export interface ITienda{

}

export interface IJerarquia{
    id: number,
    niverlJerarquia: number,
    nombre: string,
    descripcion: string, 
    estatus: number
}


export interface IMenu{
    id: number,
    idMenuPadre: number,
    nombre: string, 
    descripcion: string,
    url: string,
    cssClass: string, 
    idEstatus: number,
    subMenus: IMenu[]
}

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
    estatus: number,
    detallesUsuarioAsignacion: IDetalleUsuarioAsignacion[]
}

export interface IDetalleUsuarioAsignacion{
    id: number, 
    usuarioId: number,
    referenciaId: number,
    idEstatus: number
}

export interface IMovil{
    id:number,
    regionId: number,
    plazaImmexId: number,
    marca: string,
    modelo: string, 
    numeroTelefono: string,
    numeroSerie: string, 
    imei: string, 
    idEstatus: number
}

export interface IVehiculo{
    id: number,
    plazaImmexId: number,
    marca: string,
    modelo: string,
    numeroPlaca: string, 
    numeroEconomico: string, 
    idEstatus: number, 
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
    jerarquiaId: number,
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