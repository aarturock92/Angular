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
export class MovilService{
    private _baseUrl: string
    private _uriMovil: string ="Movil"

    constructor(private http: Http,
                private configService: ConfigService){}

    getMovil

}