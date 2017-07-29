import { Injectable }  from '@angular/core'
import { Response } from '@angular/http'
import { AuthHttp } from 'angular2-jwt'

import { Observable } from 'rxjs/Rx'
import { Observer } from 'rxjs/Observer' 
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { IMovil, Pagination, PaginatedResult } from '../interfaces'
import { ItemsService, ConfigService, ETypeStatusCode } from '../utils/index'
import { DataService } from './data.service'

@Injectable()
export class MovilService extends DataService{
    private _baseUrl: string
    private _uriMovil: string ="Movil"

    constructor(private authHttp: AuthHttp,
                private configService: ConfigService){

        super()

        this._baseUrl = configService.getApiURI()
    }

    getMovilesByEstatus(estatusRegistro:number){
        return this.authHttp.get(this._baseUrl + this._uriMovil + '?estatusRegistro=' + estatusRegistro)
               .map((res: Response) => {
                   return res.json()
               })
               .catch(this.handleError)
    }

    getMovilesPagination(page?:number, itemsPerPage?:number):Observable<PaginatedResult<IMovil[]>>{
        let paginatedResult: PaginatedResult<IMovil[]> = new PaginatedResult<IMovil[]>()
        return this.authHttp.get(this._baseUrl + this._uriMovil + '/search/'+page+'/'+itemsPerPage)
                .map((res: Response) => {
                    let data = res.json();
                    paginatedResult.count = data.count
                    paginatedResult.page = data.page
                    paginatedResult.result = data.items
                    paginatedResult.totalCount = data.totalCount
                    paginatedResult.totalPages = data.totalPages
                    return paginatedResult
                })
                .catch(this.handleError)
    }

    getMovilDetails(id:number): Observable<IMovil> {
        return this.authHttp.get(this._baseUrl + this._uriMovil + '/'+id)
               .map((res: Response) => {
                    return res.json()
               })
               .catch((error: any) => {

                    switch(parseInt(error.status)){
                        case ETypeStatusCode.NOTFOUND:
                            
                            break;
                        case ETypeStatusCode.INTERNALSERVERERROR:
                            
                            break;
                        default:
                            break;
                    }
                    
                    return Observable.throw('Server error');
               })
    }

    createMovil(movil: IMovil): Observable<IMovil>{
        return this.authHttp.post(this._baseUrl + this._uriMovil, JSON.stringify(movil))
               .map((res: Response) => {
                   return res.json()
               })
               .catch((error: any) => {
                    var serverError = error.json()
                    var modelStateErrors: string = ''
                    var applicationError: string = ''

                    switch (error.status) {
                        //El formato para los datos no es el correcto.
                        case ETypeStatusCode.BADREQUEST:
                            if(!serverError.type){
                                for(var key in serverError){
                                    if(serverError[key])
                                        modelStateErrors += '' + serverError[key] + '\n'
                                }
                            }
                            break;
                        //Ya existe una entidad movil con el IMEI, Numero de Serie o
                        //Número de Telefono.
                        case ETypeStatusCode.CONFLICT:
                            
                            break;
                        //Ocurrio un error al realizar la trasacción.
                        case ETypeStatusCode.INTERNALSERVERERROR:
                            break; 
                        //Error desconocido.                   
                        default:
                            break;
                    }

                    return Observable.throw(modelStateErrors || applicationError);
               })
    }

    deleteMovil(id:number): Observable<void>{
        return this.authHttp.delete(this._baseUrl + this._uriMovil + '/'+id)
               .map((res: Response) => {
                   return;
               })
               .catch(this.handleError);
    }

    updateMovil(id:Number, movil: IMovil): Observable<IMovil>{
        return this.authHttp.put(this._baseUrl + this._uriMovil + '/'+ id, JSON.stringify(movil))
               .map((res: Response) => {
                    return res.json()
               })
               .catch(this.handleError)
    }
}



