import { Injectable } from '@angular/core'
import { Http, Response, Headers} from '@angular/http'

import { Observable } from 'rxjs/Rx'
import { Observer } from 'rxjs/Observer' 
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { IVehiculo, Pagination, PaginatedResult}  from '../interfaces'
import { ItemsService, ConfigService, AuthenticationService} from '../utils/index'
import { DataService } from './data.service'

@Injectable()
export class VehiculoService extends DataService{
    private _baseUrl: string
    private _uriVehiculo: string = 'Vehiculo'

    constructor(private http: Http,
                private configService: ConfigService,
                private authenticationService: AuthenticationService){
        super()
        this._baseUrl = this.configService.getApiURI()
    }

    getVehiculosByEstatusRegistro(estatusRegistro:number){
        this.http.get(this._baseUrl + this._uriVehiculo + '/list?estatusRegistro='+estatusRegistro,
                     {headers: this.authenticationService.getHeaders()})
                     .map((res: Response) => {
                        return res.json()
                     }) 
                     .catch(this.handleError)
    }

    getVehiculoDetails(idVehiculo: number): Observable<IVehiculo> {
        return this.http.get(this._baseUrl + this._uriVehiculo + '/'+ idVehiculo,
                     { headers: this.authenticationService.getHeaders()})
                     .map((res: Response) => {
                          return res.json()
                     })
                     .catch(this.handleError)
    }

    registerVehiculo(vehiculo: IVehiculo){
        this.http.post(this._baseUrl + this._uriVehiculo + '/register', JSON.stringify(vehiculo),
                       { headers: this.authenticationService.getHeaders()})
                       .map((res: Response) => {
                           return res.json()
                       })
                       .catch(this.handleError)

    }

    updateVehiculo(){

    }
}