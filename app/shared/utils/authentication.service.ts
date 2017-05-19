import { Injectable } from '@angular/core'
import { Http, Headers} from '@angular/http'

@Injectable()
export class AuthenticationService{
    private itemToken: string = 'Authorization'
    private itemFullName: string ='FullName'
    

    private getToken(){
        let token  = 'Bearer '+ window.sessionStorage.getItem(this.itemToken)         
        return token
    }

    private getFullName(){
        let fullName = window.sessionStorage.getItem(this.itemFullName)
        return fullName
    }

    setToken(token:string){
        window.sessionStorage.setItem(this.itemToken, token)
    }

    getHeaders():Headers{
        let headers = new Headers()
        headers.append('Content-Type','application/json')
        headers.append(this.itemToken, this.getToken())
        headers.append(this.itemFullName, this.getFullName())        
        return headers
    }

}