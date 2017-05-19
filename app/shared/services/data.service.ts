import { Injectable} from '@angular/core'
import { Http, Response, Headers} from '@angular/http'

import { Observable} from 'rxjs/Rx'
import { Observer} from 'rxjs/Observer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { IUser, ISchedule, IScheduleDetails, Pagination, PaginatedResult, IEstado, IUsuario} from '../interfaces'
import { ItemsService} from '../utils/items.service'
import { ConfigService} from '../utils/config.service'
import { AuthenticationService} from '../utils/authentication.service'

@Injectable()
export class DataService{
    _baseUrl: string = ''
    private headers:any

    constructor(private http: Http,
                private itemsService: ItemsService,
                private configService: ConfigService,
                private authentication: AuthenticationService){
        this._baseUrl = configService.getApiURI()
        this.headers = this.authentication.getHeaders()
        debugger;
    }

    getUsers(): Observable<IUser[]>{

        return this.http.get(this._baseUrl + 'users', {headers : this.headers})
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
        return this.http.post(this._baseUrl + 'users/', JSON.stringify(user), 
                            { headers: this.headers})
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

    getEstadoDetails(id:number, incluirMunicipios:boolean): Observable<IEstado> {
        console.log("headers",this.headers);
        return this.http.get(this._baseUrl + 'estados/'+ id + '?incluirEstados='+incluirMunicipios,
                             {headers: this.headers} )
            .map((res: Response) => {
                debugger;
                return res.json()
            })
            .catch(this.handleError)
    }

    getEstados(page?:number, itemsPerPage?: number): Observable<PaginatedResult<IEstado[]>> {
        var paginatedResult: PaginatedResult<IEstado[]> = new PaginatedResult<IEstado[]>();

        return this.http.get(this._baseUrl + 'estado/search/'+ page+'/'+itemsPerPage,
                             {headers: this.headers})
               .map((res: Response) => {
                   debugger;
                   console.log("headers",res.headers);
                    console.log("res",res)

                    let data = res.json()
                    
                    paginatedResult.count = data.count;
                    paginatedResult.page = data.page;
                    paginatedResult.result = data.items;
                    paginatedResult.totalCount = data.totalCount;
                    paginatedResult.totalPages = data.totalPages;    
                    return paginatedResult;
               })
               .catch(this.handleError);
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