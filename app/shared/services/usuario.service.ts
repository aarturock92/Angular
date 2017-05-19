import { Injectable } from '@angular/core'
import { Http, Response, Headers} from '@angular/http'

import { Observable } from 'rxjs/Rx'
import { Observer} from 'rxjs/Observer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
 
import { ItemsService} from '../utils/items.service'
import { AuthenticationService} from '../utils/authentication.service'

@Injectable()
export class UsuarioService{
    private _baseUrl: string

    constructor(private http: Http, 
                private itemsService: ItemsService,
                private authentication: AuthenticationService){

    }
}
