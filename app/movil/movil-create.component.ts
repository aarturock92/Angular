import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { NgForm } from '@angular/forms'
import { IMovil, IRegion, IPlazaImmex } from '../shared/interfaces'
import { MovilService, RegionService } from '../shared/services/index'
import { ItemsService, NotificationService, MappingService } from '../shared/utils/index'

@Component({
    moduleId: module.id,
    selector: 'app-movil-create',
    templateUrl: 'movil-create.component.html'
})
export class MovilCreateComponent implements OnInit {
    public movil: any = {}
    public OnColor: string = 'success'
    public OffColor: string = 'warning'
    public OnText: string = 'Activo'
    public OffText: string = 'Inactivo'
    EstatusMovil: boolean = true

    regiones: IRegion[]
    plazasImmex: IPlazaImmex[]
    regionesLoaded: boolean= false

    constructor(private route: ActivatedRoute,
                private router: Router, 
                private movilService: MovilService,
                private regionService: RegionService,
                private notificationService:NotificationService,
                private mappingService: MappingService) {}

    ngOnInit() {
        this.loadRegiones()
    }

    loadRegiones() {
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
            },
            error => {
                this.notificationService.printErrorMessage("Error al cargar las Plazas Immex "+error)
            })
    }

    saveMovil(formValues){
        formValues.idEstatus = (this.EstatusMovil) ? 1: 2
        console.log("formValues", formValues);
        this.movilService.createMovil(this.mappingService.mapMovilCreate(formValues))
            .subscribe((movilCreado: IMovil) => {
                console.log("movilCreated",movilCreado);
            },
            error => {
                this.notificationService.printErrorMessage('No se pudo crear el movil: '+error)
            })

    }

    back() {
        this.router.navigate(['/movil'])
    }



}