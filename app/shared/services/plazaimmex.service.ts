import { Injectable }  from '@angular/core'
import { Response } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import { Observer} from 'rxjs/Observer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { ConfigService } from '../utils/index'
import { DataService } from './data.service'
import { IPlazaImmex, IMovil, IVehiculo } from '../interfaces'
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

    getPlazasImmexByEstatus(incluirPlazaOxxo: boolean, estatusRegistro: number): Observable<IPlazaImmex[]>{
        return this.authHttp.get(this._baseUrl + this._uriPlazaImmex + '/list?incluirPlazasOxxo='+incluirPlazaOxxo + '&estatusRegistro='+estatusRegistro)
                   .map((res: Response) => {
                        return res.json()
                   })
                   .catch(this.handleError)
    }

    getPlazaImmexDetails(id:number, incluirPlazaOxxo: boolean): Observable<IPlazaImmex>{
        return this.authHttp.get(this._baseUrl + this._uriPlazaImmex + '/'+ id+'?incluirPlazaOxxo='+incluirPlazaOxxo)
                   .map((res: Response) => {
                        return res.json()
                   })
                   .catch(this.handleError)
    }   

    getMovilesByIdPlazaImmex(idPlazaImmex: number, estatusRegistro: number):Observable<IMovil[]>{
        return this.authHttp.get(this._baseUrl + this._uriPlazaImmex + '/'+ idPlazaImmex + '/Moviles?estatusRegistro='+estatusRegistro)
                   .map((res: Response) => {
                       return res.json()
                   })
                   .catch(this.handleError)
    }

    getVehiculosByIdPlazaImmex(idPlazaImmex: number, estatusRegistro:number): Observable<IVehiculo[]>{
        return this.authHttp.get(this._baseUrl + this._uriPlazaImmex + '/' + idPlazaImmex + '/Vehiculos')
                   .map((res: Response)=> {
                       return res.json()
                   })
                   .catch(this.handleError)
    }   


}