import { Injectable }  from '@angular/core'
import { Response } from '@angular/http'
import { ConfigService } from '../utils/index'
import { DataService } from './data.service'
import { AuthHttp } from 'angular2-jwt'

@Injectable()
export class PlazaImmexService extends DataService{
    private _baseUrl: string
    private _uriPlazaImmex: string = 'PlazaImmex'

    constructor(private authHttp: AuthHttp,
                private configService: ConfigService){
        super()
        this._baseUrl = this.configService.getApiURI()
    }

    getPlazasImmexByEstatus(incluirPlazaOxxo: boolean, estatusRegistro: number){
        return this.authHttp.get(this._baseUrl + this._uriPlazaImmex + '/list?incluirPlazasOxxo='+incluirPlazaOxxo + '&estatusRegistro='+estatusRegistro)
                   .map((res: Response) => {
                        return res.json()
                   })
                   .catch(this.handleError)
    }

    getPlazaImmexDetails(id:number, incluirPlazaOxxo: boolean){
        return this.authHttp.get(this._baseUrl + this._uriPlazaImmex + '/'+ id+'?incluirPlazaOxxo='+incluirPlazaOxxo)
                   .map((res: Response) => {
                        return res.json()
                   })
                   .catch(this.handleError)
    }       


}