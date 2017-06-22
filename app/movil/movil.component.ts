import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { NgForm } from '@angular/forms'
import { SpinnerComponent } from 'ng2-component-spinner'
import { SelectComponent } from 'ng2-select'
import { IMovil, IRegion, IPlazaImmex } from '../shared/interfaces'
import { MovilService, RegionService } from '../shared/services/index'
import { NotificationService, ItemsService } from '../shared/utils/index'

@Component({
    moduleId: module.id,
    selector: 'app-movil',
    templateUrl: 'movil.component.html'
})
export class MovilComponent implements OnInit{
    public idMovil: number
    public movil: any = {}

    public itemsRegiones: Array<any> = []

    public regionesLoaded: boolean = false

    constructor(private route: ActivatedRoute,
                private router:Router,
                private regionService: RegionService,
                private notificationService: NotificationService){}

    ngOnInit(){
        this.loadRegiones()
        // this.idMovil = +this.route.snapshot.params['id']

        // if(!isNaN(this.idMovil)){
        //     console.log("this.idMovil", this.idMovil);
        // }else{
        //     console.log("Es Nan");
        // }       
    }

    /**
     * 
     */
    loadRegiones(){
        this.itemsRegiones = [] 
        this.regionService.getRegionesByEstatus(false, 1)
            .subscribe((res: IRegion[]) => {
                if(res.length > 0){
                    for(let indexRegion = 0; indexRegion < res.length; indexRegion++){
                        let region = res[indexRegion];
                        this.itemsRegiones.push({
                            id: region.id,
                            text: region.nombreRegion
                        })
                    }
                }else{
                    this.notificationService.printErrorMessage('No se encontraron regiones')
                }
                this.regionesLoaded = true
            },
            error => {
                this.notificationService.printErrorMessage("Error al cargar las Regiones " + error)
            })           
    }
}