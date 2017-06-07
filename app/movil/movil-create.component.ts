import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { NgForm } from '@angular/forms'
import { IMovil } from '../shared/interfaces'

@Component({
    moduleId: module.id,
    selector: 'app-movil-create',
    templateUrl: 'movil-create.component.html'
})
export class MovilCreateComponent implements OnInit{
    public movil:any = { }

    constructor(private route: ActivatedRoute,
                private router:Router){

                }

    ngOnInit(){

    }

    back(){
         this.router.navigate(['/movil'])
    }
}