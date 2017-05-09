import { Injectable} from '@angular/core'
import { Http, Response, Headers} from '@angular/http'

import { Observable} from 'rxjs/Rx'
import { Observer} from 'rxjs/Observer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { IUser, ISchedule, IScheduleDetails, Pagination, PaginatedResult, IEstado} from '../interfaces'
import { ItemsService} from '../utils/items.service'
import { ConfigService} from '../utils/config.service'

@Injectable()
export class DataService{
    _baseUrl: string = ''

    constructor(private http: Http,
                private itemsService: ItemsService,
                private configService: ConfigService){
        this._baseUrl = configService.getApiURI()
    }

    getUsers(): Observable<IUser[]>{
        return this.http.get(this._baseUrl + 'users')
               .map((res: Response) => {
                    return res.json();
               })
               .catch(this.handleError)
    }

    getUserSchedules(id: number): Observable<ISchedule[]>{
        return this.http.get(this._baseUrl + 'users/' +id + 'schedules')
               .map((res: Response) => {
                   return res.json();
               })   
               .catch(this.handleError)
    }

    createUser(user: IUser): Observable<IUser>{
        let headers = new Headers()
        headers.append('Content-Type','application/json')

        return this.http.post(this._baseUrl + 'users/', JSON.stringify(user), { headers: headers})
            .map((res: Response) => {
                return res.json()
            })
            .catch(this.handleError)
    }

    updateUser(user: IUser): Observable<void>{
        let headers = new Headers()
        headers.append('Content-Type','application/json')

        return this.http.put(this._baseUrl + 'users/'+user.id, JSON.stringify(user),  {headers: headers})
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError)
    }

    deleteUser(id: number): Observable<void>{
        return this.http.delete(this._baseUrl + 'users/'+id)
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError)
    }

    getEstados(): Observable<IEstado[]>{
        return this.http.get(this._baseUrl + 'estados/list')
            .map((res: Response) => {
                return res.json()
            })
            .catch(this.handleError)
    }

    getEstadoDetails(id:number): Observable<IEstado> {
        return this.http.get(this._baseUrl + 'estados/'+ id)
            .map((res: Response) => {
                debugger;
                return res.json()
            })
            .catch(this.handleError)
    }

    private handleError(error: any){
        var applicationError = error.headers.get('Application-Error')
        var serverError = error.json()
        var modelStateErrors: string = ''

        if(!serverError.type){
            for(var key in serverError){
                if(serverError[key])
                    modelStateErrors += '' + serverError[key] + '\n'
            }
        }

        modelStateErrors = modelStateErrors = '' ? null: modelStateErrors;

        return Observable.throw(applicationError || modelStateErrors || 'Server error')
    }
}