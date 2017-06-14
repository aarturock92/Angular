import { Injectable }  from '@angular/core'
import { Http, Response, Headers } from '@angular/http'
import { ConfigService, AuthenticationService } from '../utils/index'
import { DataService } from './data.service'

@Injectable()
export class PlazaImmexService extends DataService{
    private _baseUrl: string
    private _uriPlazaImmex: string = 'PlazaImmex'

    constructor(private http: Http,
                private configService: ConfigService,
                private authenticationService: AuthenticationService){
        super()
        this._baseUrl = this.configService.getApiURI()
    }

    getPlazasImmexByEstatus(incluirPlazaOxxo: boolean, estatusRegistro: number){
        return this.http.get(this._baseUrl + this._uriPlazaImmex + '/list?incluirPlazasOxxo='+incluirPlazaOxxo + '&estatusRegistro='+estatusRegistro,
                            {headers: this.authenticationService.getHeaders() })
                   .map((res: Response) => {
                        return res.json()
                   })
                   .catch(this.handleError)
    }

    getPlazaImmexDetails(id:number, incluirPlazaOxxo: boolean){
        return this.http.get(this._baseUrl + this._uriPlazaImmex + '/'+ id+'?incluirPlazaOxxo='+incluirPlazaOxxo, { headers: this.authenticationService.getHeaders()})
                   .map((res: Response) => {
                        return res.json()
                   })
                   .catch(this.handleError)
    }       


}