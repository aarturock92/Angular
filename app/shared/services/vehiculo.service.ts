import { Injectable } from '@angular/core'
import { Response } from '@angular/http'
import { AuthHttp } from 'angular2-jwt'

import { Observable } from 'rxjs/Rx'
import { Observer } from 'rxjs/Observer' 
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { IVehiculo, Pagination, PaginatedResult}  from '../interfaces'
import { ItemsService, ConfigService} from '../utils/index'
import { DataService } from './data.service'

@Injectable()
export class VehiculoService extends DataService{
    private _baseUrl: string
    private _uriVehiculo: string = 'Vehiculo'

    constructor(private authHttp: AuthHttp,
                private configService: ConfigService){
        super()
        this._baseUrl = this.configService.getApiURI()
    }

    getVehiculosByEstatusRegistro(estatusRegistro:number){
        this.authHttp.get(this._baseUrl + this._uriVehiculo + '/list?estatusRegistro='+estatusRegistro)
                     .map((res: Response) => {
                        return res.json()
                     }) 
                     .catch(this.handleError)
    }

    getVehiculoDetails(idVehiculo: number): Observable<IVehiculo> {
        return this.authHttp.get(this._baseUrl + this._uriVehiculo + '/'+ idVehiculo)
                     .map((res: Response) => {
                          return res.json()
                     })
                     .catch(this.handleError)
    }

    registerVehiculo(vehiculo: IVehiculo):Observable<IVehiculo> {
        return this.authHttp.post(this._baseUrl + this._uriVehiculo + '/register', JSON.stringify(vehiculo))
                       .map((res: Response) => {
                           return res.json()
                       })
                       .catch(this.handleError)
    }

    updateVehiculo(){

    }
}