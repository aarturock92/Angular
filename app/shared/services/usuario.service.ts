import { Injectable } from '@angular/core'
import { Http, Response, Headers} from '@angular/http'

import { Observable } from 'rxjs/Rx'
import { Observer} from 'rxjs/Observer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
 
import { IUsuario, Pagination, PaginatedResult}  from '../interfaces'
import { ItemsService, ConfigService, AuthenticationService} from '../utils/index'
import { DataService } from './data.service'

@Injectable()
export class UsuarioService extends DataService{
    private _baseUrl: string
    private _uriUsuario: string = "Usuario"

    constructor(private http: Http, 
                private configService: ConfigService,
                private authentication: AuthenticationService){
        super()

        this._baseUrl = configService.getApiURI()       
    }
    
    getUsuarios(page?:number,itemsPerPage?:number): Observable<PaginatedResult<IUsuario[]>>{
        let paginatedResult: PaginatedResult<IUsuario[]> = new PaginatedResult<IUsuario[]>()

        return this.http.get(this._baseUrl + this._uriUsuario +'/search/' + page + '/' + itemsPerPage, { headers: this.authentication.getHeaders()})
               .map((res: Response) => {
                    let data = res.json()
                    paginatedResult.count = data.count
                    paginatedResult.page = data.page
                    paginatedResult.result = data.items
                    paginatedResult.totalCount = data.totalCount
                    paginatedResult.totalPages = data.totalPages
                    return paginatedResult
               })
               .catch(this.handleError)
    }

    getUsuarioDetails(id:number): Observable<IUsuario>{
        return this.http.get(this._baseUrl + this._uriUsuario + '/'+ id, {headers: this.authentication.getHeaders() })
               .map((res: Response) => {
                     return res.json()
               })
               .catch(this.handleError)
    }

    createUsuario(usuario:IUsuario): Observable<IUsuario>{
        return this.http.post(this._baseUrl + this._uriUsuario + '/register', JSON.stringify(usuario), {headers: this.authentication.getHeaders() })
            .map((res: Response) => {
                return res.json()
            })
            .catch(this.handleError)
    }

    deleteUser(idUser: number): Observable<void>{
        return this.http.delete(this._baseUrl + 'usuario/'+ idUser, {headers: this.authentication.getHeaders() })
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError)
    }
}
