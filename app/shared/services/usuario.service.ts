import { Injectable } from '@angular/core'
import { Response } from '@angular/http'
import { AuthHttp } from 'angular2-jwt'

import { Observable } from 'rxjs/Rx'
import { Observer} from 'rxjs/Observer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
 
import { IUsuario, Pagination, PaginatedResult}  from '../interfaces'
import { ItemsService, ConfigService} from '../utils/index'
import { DataService } from './data.service'

@Injectable()
export class UsuarioService extends DataService{
    private _baseUrl: string
    private _uriUsuario: string = "Usuario"

    constructor(private authHttp: AuthHttp,
                private configService: ConfigService){
        super()

        this._baseUrl = configService.getApiURI()       
    }
    
    getUsuarios(page?:number,itemsPerPage?:number): Observable<PaginatedResult<IUsuario[]>>{
        let paginatedResult: PaginatedResult<IUsuario[]> = new PaginatedResult<IUsuario[]>()
        return this.authHttp.get(this._baseUrl + this._uriUsuario + '/search/' + page + '/' + itemsPerPage)
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
        return this.authHttp.get(this._baseUrl + this._uriUsuario + '/'+ id)
                 .map((res: Response) => {
                     return res.json()
               })
               .catch(this.handleError)
    }

    createUsuario(usuario:IUsuario): Observable<IUsuario>{
        return this.authHttp.post(this._baseUrl + this._uriUsuario + '/register', JSON.stringify(usuario))
            .map((res: Response) => {
                return res.json()
            })
            .catch(this.handleError)
    }

    deleteUser(idUser: number): Observable<void>{
        return this.authHttp.delete(this._baseUrl + 'usuario/'+ idUser)
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError)
    }
}
