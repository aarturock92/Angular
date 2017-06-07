import { Component, OnInit } from '@angular/core' 
import { Router, ActivatedRoute } from '@angular/router'
import { NgForm } from '@angular/forms'
import { MovilService } from '../shared/services/movil.service'
import { RegionService } from '../shared/services/region.service'

import { ItemsService } from '../shared/utils/items.service'
import { NotificationService } from '../shared/utils/notification.service'
import { ConfigService } from '../shared/utils/config.service'
import { MappingService } from '../shared/utils/mapping.service'
import { IMovil, IRegion, IPlazaImmex } from '../shared/interfaces'

@Component({
    moduleId: module.id,
    selector: 'app-movil-edit',
    templateUrl: 'movil-edit.component.html'
})
export class MovilEditComponent implements OnInit{
    private movil: IMovil
    private idMovil: number
    public regiones: IRegion[]
    public plazasImmex: IPlazaImmex[]

    movilLoaded: boolean = false
    regionesLoaded: boolean = false
    plazasImmexLoaded: boolean = false

    public OnColor: string = 'success' 
    public OffColor: string = 'warning'
    public OnText: string = 'Activo'
    public OffText: string = 'Inactivo'
    public EstatusMovil: boolean = false

    constructor(private route: ActivatedRoute,
                private router:Router,
                private itemsService: ItemsService,
                private notificationService: NotificationService,
                private movilService: MovilService,
                private regionService: RegionService){}

    ngOnInit(){
        this.idMovil = +this.route.snapshot.params['id']
        this.loadRegiones();
        this.loadMovilDetails()        
    }


    loadMovilDetails(){
        this.movilService.getMovilDetails(this.idMovil)
            .subscribe((movil: IMovil) => {
                this.movil = this.itemsService.getSerialized<IMovil>(movil)
                this.movilLoaded = true
                this.loadControlEstatus(this.movil.idEstatus)
                this.onChangeSelectRegion(this.movil.idRegion)
            },
            error => {
                this.notificationService.printErrorMessage('Failed to load movil '+error)
            })
    }

    loadRegiones(){
        this.regionService.getRegionesByEstatus(false, 1)
            .subscribe((res: IRegion[]) => {
                this.regiones = res
                this.regionesLoaded = true
            },
            error => {
                this.notificationService.printErrorMessage("Error al cargar las Regiones " + error)
            })           
    }

    onChangeSelectRegion(idRegion: number){
        this.regionService.getRegionDetails(idRegion, true)
            .subscribe((res: IRegion) => {
                this.plazasImmex = res.plazasImmex
                this.plazasImmexLoaded = true
            },
            error => {
                this.notificationService.printErrorMessage("Error al cargar las Plazas Immex "+error)
            })
    }


    loadControlEstatus(idEstatus: number){
        switch(idEstatus){
            case 1:
                this.EstatusMovil = true
                break;
            case 2:
                this.EstatusMovil = false
                break;
        }
    }
}

