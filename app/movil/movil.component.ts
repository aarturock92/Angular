import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { NgForm } from '@angular/forms'
import { SpinnerComponent } from 'ng2-component-spinner'
import { SelectComponent } from 'ng2-select'
import { IMovil, IRegion, IPlazaImmex } from '../shared/interfaces'
import { MovilService, RegionService } from '../shared/services/index'
import { NotificationService, ItemsService, MappingService } from '../shared/utils/index'

@Component({
    moduleId: module.id,
    selector: 'app-movil',
    templateUrl: 'movil.component.html'
})
export class MovilComponent implements OnInit{
    public idMovil: number
    public movil: any
    
    public itemsRegiones: Array<any> = []
    public itemsPlazasImmex: Array<any> = []

    public esEdicion: boolean
    public EstatusMovil: boolean = true

    public regionesLoaded: boolean = false
    public showSpinner: boolean = true

    public OnColor: string = 'success' 
    public OffColor: string = 'warning'
    public OnText: string = 'Activo'
    public OffText: string = 'Inactivo'

    constructor(private route: ActivatedRoute,
                private router:Router,
                private regionService: RegionService,
                private movilService: MovilService,
                private itemsService: ItemsService,
                private notificationService: NotificationService,
                private mappingService: MappingService){}

    ngOnInit(){
        this.loadRegiones()
        this.idMovil = +this.route.snapshot.params['id']
        this.movil = {};

        if(!isNaN(this.idMovil)){
            this.loadDetailsMovil()
            this.esEdicion = true            
        }else{
            this.showSpinner = false
        }       
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

    loadDetailsMovil(){
        this.movilService.getMovilDetails(this.idMovil)
            .subscribe((movil: IMovil) => {
                 console.log('movil', movil);
                 this.movil = this.itemsService.getSerialized<IMovil>(movil)
                 this.showSpinner = false   
            },
            error => {
                
            })
    }

    loadPlazasImmex(idRegion: number){

    }

    /**
     * Evento para el botón regresar
     */
    back(){
        this.router.navigate(['/movil'])
    }

    onChangeSelectRegion(idRegion: number){
         this.showSpinner = true
         this.regionService.getRegionDetails(idRegion, true)
             .subscribe((region: IRegion)=> {
                this.itemsPlazasImmex = []
                if(region.plazasImmex.length > 0){
                    for(let indexPlaza= 0; indexPlaza < region.plazasImmex.length; indexPlaza++){
                        let plaza = region.plazasImmex[indexPlaza]
                        this.itemsPlazasImmex.push({
                            id: plaza.id,
                            text: plaza.nombrePlazaImmex
                        })
                    }
                }else{
                    this.notificationService.printErrorMessage('No se encontraron Plazas Immex para esta Región')
                } 
                console.log('this.itemsPlazasImmex', this.itemsPlazasImmex)
                this.showSpinner= false      
             }, 
             error => {
                this.notificationService.printErrorMessage('Ocurrio un problema la cargar las Plazas Immex')
                this.showSpinner= false
             })                
    }


    crearMovil(formValues){
        console.log("crearMovil", formValues)
        this.showSpinner = true
         this.movilService.createMovil(this.mappingService.mapMovilCreate(formValues))
            .subscribe((movilCreado: IMovil) => {
                this.showSpinner = false
                this.back()
            },
            error => {
                this.notificationService.printErrorMessage('No se pudo crear el movil: '+error)
            })
    }

    editarMovil(formValues){
        console.log("editarMovil", formValues)
         this.showSpinner = true
         this.movilService.updateMovil(this.idMovil, this.mappingService.mapMovilCreate(formValues))
            .subscribe((movilCreado: IMovil) => {
                this.showSpinner = false
                this.back()
            },
            error => {
                this.showSpinner = false
                console.log('error',error)
                this.notificationService.printErrorMessage('No se pudo crear el movil: '+error)                
            })
    }
}