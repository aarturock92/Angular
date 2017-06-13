import { Injectable }  from '@angular/core'
import { Http, Response, Headers } from '@angular/http'

import { Observable } from 'rxjs/Rx'
import { Observer } from 'rxjs/Observer' 
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { IMovil, Pagination, PaginatedResult } from '../interfaces'
import { ItemsService } from '../utils/items.service'
import { ConfigService } from '../utils/config.service'
import { AuthenticationService } from '../utils/authentication.service'
import { DataService } from './data.service'

@Injectable()
export class MovilService extends DataService{
    private _baseUrl: string
    private _uriMovil: string ="Movil"

    constructor(private http: Http,
                private configService: ConfigService,
                private authenticationService: AuthenticationService){

        super()

        this._baseUrl = configService.getApiURI()
    }

    getMovilesByEstatus(estatusRegistro:number){
        return this.http.get(this._baseUrl + this._uriMovil + '/list?estatusRegistro='+estatusRegistro, {headers: this.authenticationService.getHeaders()})
               .map((res: Response) => {
                   return res.json()
               })
               .catch(this.handleError)
    }

    getMovilesPagination(page?:number, itemsPerPage?:number):Observable<PaginatedResult<IMovil[]>>{
        let paginatedResult: PaginatedResult<IMovil[]> = new PaginatedResult<IMovil[]>()

        return this.http.get(this._baseUrl + this._uriMovil + '/search/'+page+'/'+itemsPerPage, { headers: this.authenticationService.getHeaders()})
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
        return this.http.get(this._baseUrl + this._uriMovil + '/'+id, {headers: this.authenticationService.getHeaders()} )
               .map((res: Response) => {
                    return res.json()
               })
               .catch(this.handleError)
    }

    createMovil(movil: IMovil): Observable<IMovil>{
        return this.http.post(this._baseUrl + this._uriMovil + '/register', JSON.stringify(movil), {headers: this.authenticationService.getHeaders()} )
               .map((res: Response) => {
                   return res.json()
               })
               .catch(this.handleError)
    }

    deleteMovil(id:number): Observable<void>{
        return this.http.delete(this._baseUrl + this._uriMovil + '/'+id, {headers: this.authenticationService.getHeaders() })
               .map((res: Response) => {
                   return;
               })
               .catch(this.handleError);
    }

    updateMovil(id:Number, movil: IMovil): Observable<IMovil>{
        return this.http.put(this._baseUrl + this._uriMovil + '/'+ id, JSON.stringify(movil), {headers: this.authenticationService.getHeaders()})
               .map((res: Response) => {
                    return res.json()
               })
               .catch(this.handleError)
    }
}