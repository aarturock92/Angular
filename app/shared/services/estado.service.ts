import { Injectable } from '@angular/core'
import { Response} from '@angular/http'
import { AuthHttp } from 'angular2-jwt'

import { Observable } from 'rxjs/Rx'
import { Observer} from 'rxjs/Observer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { IEstado, Pagination, PaginatedResult} from '../interfaces'
import { ItemsService } from '../utils/items.service'
import { ConfigService } from '../utils/config.service'
import { AuthenticationService } from '../utils/authentication.service'
import { DataService } from './data.service'

@Injectable()
export class EstadoService extends DataService{
    private _baseUrl: string
    private _uriEstado: string = 'Estado'

    constructor(private authHttp: AuthHttp, 
                private itemsService: ItemsService,
                private configService: ConfigService){
        super()
        
        this._baseUrl = configService.getApiURI()
    }

    getEstadoByStatus(includeMunicipios: boolean, statusRegistro: number){
        return this.authHttp.get(this._baseUrl + this._uriEstado + '/list?incluirMunicipios=' + includeMunicipios + '&estatusRegistro='+statusRegistro)
               .map((res: Response) => {
                    return res.json()
               })
               .catch(this.handleError)
    }

    getEstados(page?:number, itemsPerPage?: number):Observable<PaginatedResult<IEstado[]>>{
        let paginatedResult: PaginatedResult<IEstado[]> = new PaginatedResult<IEstado[]>()

        return this.authHttp.get(this._baseUrl + this._uriEstado +'/search/' + page + '/'+itemsPerPage)
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

    getEstadoDetails(id:number, incluirMunicipios:boolean): Observable<IEstado> {
        return this.authHttp.get(this._baseUrl + this._uriEstado +'/'+ id + '?incluirMunicipios='+incluirMunicipios)
            .map((res: Response) => {
                return res.json()
            })
            .catch(this.handleError)
    }
}
