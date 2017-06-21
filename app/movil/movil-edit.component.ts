import { Component, OnInit } from '@angular/core' 
import { Router, ActivatedRoute } from '@angular/router'
import { NgForm } from '@angular/forms' 
import { MovilService, RegionService } from '../shared/services/index'
import { ItemsService, NotificationService, MappingService } from '../shared/utils/index'
import { IMovil, IRegion, IPlazaImmex } from '../shared/interfaces'
import { SpinnerComponent } from 'ng2-component-spinner'

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
    public showSpinner: boolean = true

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
                private mappingService: MappingService,
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
                this.onChangeSelectRegion(this.movil.regionId)
                this.showSpinner = false
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
        this.showSpinner = true
        this.regionService.getRegionDetails(idRegion, true)
            .subscribe((res: IRegion) => {
                this.plazasImmex = res.plazasImmex
                this.plazasImmexLoaded = true
                this.showSpinner = false
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

    back(){
        this.router.navigate(['/movil'])
    }

    saveMovil(formValues){
         this.showSpinner = true
         formValues.idEstatus = (this.EstatusMovil) ? 1: 2

          this.movilService.updateMovil(this.idMovil, this.mappingService.mapMovilCreate(formValues))
            .subscribe((movilCreado: IMovil) => {
                this.showSpinner = false
                this.back()
            },
            error => {
                this.notificationService.printErrorMessage('No se pudo crear el movil: '+error)
            })
    }
}

