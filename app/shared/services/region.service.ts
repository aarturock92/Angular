import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http'

import { Observable } from 'rxjs/Rx'
import { Observer } from 'rxjs/Observer' 
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { IRegion, Pagination, PaginatedResult } from '../interfaces'
import { ItemsService } from '../utils/items.service'
import { ConfigService } from '../utils/config.service'
import { AuthenticationService } from '../utils/authentication.service'
import { DataService } from './data.service'


@Injectable()
export class RegionService extends DataService{
    private _baseUrl: string
    private _uriRegion: string = 'Region'

    constructor(private http: Http,
                private configService: ConfigService,
                private authenticationService: AuthenticationService){
         super()

         this._baseUrl = configService.getApiURI()
    }


    getRegionesByEstatus(incluirPlazasImmex:boolean, estatusRegisto:number){
        return this.http.get(this._baseUrl + this._uriRegion + '/list?incluirPlazaImmex='+incluirPlazasImmex +'&estatusRegistro='+estatusRegisto,
                             { headers: this.authenticationService.getHeaders()} )
                   .map((res: Response) => {
                        return res.json()
                   })
                   .catch(this.handleError)
    }

    getRegionDetails(id:number, incluirPlazasImmex: boolean){
        return this.http.get(this._baseUrl + this._uriRegion + '/'+id + '?incluirPlazasImmex='+ incluirPlazasImmex, 
                            { headers: this.authenticationService.getHeaders() })
                   .map((res: Response) => {

                   })
                   .catch(this.handleError)
    }
}