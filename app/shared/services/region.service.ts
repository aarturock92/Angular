import { Injectable } from '@angular/core'
import { Response } from '@angular/http'
import { AuthHttp } from 'angular2-jwt'

import { Observable } from 'rxjs/Rx'
import { Observer } from 'rxjs/Observer' 
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { IRegion, Pagination, PaginatedResult } from '../interfaces'
import { ConfigService } from '../utils/index'
import { DataService } from './data.service'


@Injectable()
export class RegionService extends DataService{
    private _baseUrl: string
    private _uriRegion: string = 'Region'

    constructor(private authHttp: AuthHttp,
                private configService: ConfigService){
         super()

         this._baseUrl = configService.getApiURI()
    }


    getRegionesByEstatus(incluirPlazasImmex:boolean, estatusRegisto:number){
        return this.authHttp.get(this._baseUrl + this._uriRegion + '/list?incluirPlazaImmex='+incluirPlazasImmex +'&estatusRegistro='+estatusRegisto)
                   .map((res: Response) => {
                        return res.json()
                   })
                   .catch(this.handleError)
    }

    getRegionDetails(id:number, incluirPlazasImmex: boolean){
        return this.authHttp.get(this._baseUrl + this._uriRegion + '/'+id + '?incluirPlazasImmex='+ incluirPlazasImmex)
                   .map((res: Response) => {
                        return res.json()
                   })
                   .catch(this.handleError)
    }
}