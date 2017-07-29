export enum ETypeEstatusRegistro {
    ACTIVO = 1,
    INACTIVO = 2,
    ELIMINADO = 3,
    TODOS = 0
}


export const ONCOLOR: string = 'success'
export const OFFCOLOR: string = 'warning'
export const ONTEXT: string = 'Activo'
export const OFFTEXT: string = 'Inactivo'

/**
 * 
 */
export enum ETypeStatusCode {
    /**
     *Indica que la solicitud se realizó correctamente y la información solicitada se incluye en la respuesta. 
     */
    OK = 200,
    /**
     *Indica que la solicitud dio como resultado un nuevo recurso. 
     */
    CREATED = 201,
    /**
     *Indica que el servidor no entendio la solicitud. 
     */
    BADREQUEST = 400,
    /**
     *Indica que el recurso solicitado no existe en el servidor. 
     */
    NOTFOUND = 404,
    /**
     *Indica que no se pudo realizar la solictud debido a un conflicto en el servidor. 
     */
    CONFLICT = 409,
    /**
     *Indica que se produjo un error generico en el servidor. 
     */
    INTERNALSERVERERROR = 500,
}

