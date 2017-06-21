import { Injectable }  from '@angular/core'
import { Response } from '@angular/http'
import { AuthHttp } from 'angular2-jwt'

import { Observable } from 'rxjs/Rx'
import { Observer } from 'rxjs/Observer' 
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { IMovil, Pagination, PaginatedResult } from '../interfaces'
import { ItemsService, ConfigService } from '../utils/index'
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
        return this.authHttp.get(this._baseUrl + this._uriMovil + '/list?estatusRegistro='+estatusRegistro)
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
               .catch(this.handleError)
    }

    createMovil(movil: IMovil): Observable<IMovil>{
        return this.authHttp.post(this._baseUrl + this._uriMovil + '/register', JSON.stringify(movil))
               .map((res: Response) => {
                   return res.json()
               })
               .catch(this.handleError)
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