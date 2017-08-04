import { Injectable } from '@angular/core'
import { Http, Response, Headers} from '@angular/http'
import { AuthHttp } from 'angular2-jwt'

import { Observable } from 'rxjs/Rx'
import { Observer} from 'rxjs/Observer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { IPerfilUsuario } from '../interfaces'
import { ConfigService } from '../utils/index'
import { DataService } from './data.service'

@Injectable()
export class PerfilUsuarioService extends DataService{
    private _baseUrl: string 
    private _uriPerfilUsuario: string = 'PerfilUsuario'

    constructor(private configService: ConfigService,   
                private authHttp: AuthHttp){
        super()

        this._baseUrl = configService.getApiURI()
    }

    getListPerfilesUsuario(statusRegistro: number){
        return this.authHttp.get(this._baseUrl + this._uriPerfilUsuario + '/list?estatusRegistro='+statusRegistro)
                   .map((res: Response) => {
                        return res.json()
                    })
                   .catch(this.handleError)            
    }

    getMenuByPerfilUsuarioId(idPerfilUsuario: number){
        return this.authHttp.get(this._baseUrl + this._uriPerfilUsuario + '/'+ idPerfilUsuario + '/Menu')
                   .map((res: Response) => {
                        console.log('respuesta', res.headers)
                        var headers = res.headers;
                        var Authorization =  headers.get('Set-Authorization');
                        console.log('Set-Authorization', Authorization)
                        return res.json()
                    })
                    .catch(this.handleError)
    }

}