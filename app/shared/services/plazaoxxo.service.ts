import { Injectable  } from '@angular/core'
import { Http, Response, Headers } from '@angular/http'
import { ConfigService, AuthenticationService } from '../utils/index'
import { DataService } from './data.service'

@Injectable()
export class PlazaOxxoService extends DataService{
    private _baseUrl: string
    private _uriPlazaOxxo: string = 'PlazaOxxo'

    constructor(private http: Http,
                private configService: ConfigService,
                private authenticationService: AuthenticationService){
        super()
        this._baseUrl = this.configService.getApiURI()
    }

    getPlazaOxxoByEstatus(idEstatusRegistro: number, incluirDistritos: boolean){
        return this.http.get(this._baseUrl + this._uriPlazaOxxo + '/list?incluirDistritos'+incluirDistritos+ '&estatusRegistro='+idEstatusRegistro,
               {headers: this.authenticationService.getHeaders()} )
               .map((res: Response) => {
                    return res.json()
               })
               .catch(this.handleError)
    }

    getPlazaOxxoDetails(idPlazaOxxo: number, incluirDistritos:boolean){
        return this.http.get(this._baseUrl + this._uriPlazaOxxo+ '/'+idPlazaOxxo+'?incluirDistritos='+incluirDistritos,
               {headers: this.authenticationService.getHeaders()})
               .map((res: Response) => {
                   return res.json()
               })
               .catch(this.handleError)
    }
}