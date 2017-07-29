import { Injectable} from '@angular/core'
import { Http, Response, Headers} from '@angular/http'

import { Observable} from 'rxjs/Rx'
import { Observer} from 'rxjs/Observer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

export class DataService{

    handleError(error: any){
        console.log('statusCode', error.statusCode);
        console.log('header', error.header.get('Set-Authorization'))
        
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