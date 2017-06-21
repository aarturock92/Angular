import { Injectable  } from '@angular/core'
import { Response } from '@angular/http'
import { ConfigService } from '../utils/index'
import { DataService } from './data.service'
import { AuthHttp } from 'angular2-jwt'

@Injectable()
export class PlazaOxxoService extends DataService{
    private _baseUrl: string
    private _uriPlazaOxxo: string = 'PlazaOxxo'

    constructor(private authHttp: AuthHttp,
                private configService: ConfigService){
        super()
        this._baseUrl = this.configService.getApiURI()
    }

    getPlazaOxxoByEstatus(idEstatusRegistro: number, incluirDistritos: boolean){
        return this.authHttp.get(this._baseUrl + this._uriPlazaOxxo + '/list?incluirDistritos'+incluirDistritos+ '&estatusRegistro='+idEstatusRegistro)
               .map((res: Response) => {
                    return res.json()
               })
               .catch(this.handleError)
    }

    getPlazaOxxoDetails(idPlazaOxxo: number, incluirDistritos:boolean){
        return this.authHttp.get(this._baseUrl + this._uriPlazaOxxo+ '/'+idPlazaOxxo+'?incluirDistritos='+incluirDistritos)
               .map((res: Response) => {
                   return res.json()
               })
               .catch(this.handleError)
    }
}