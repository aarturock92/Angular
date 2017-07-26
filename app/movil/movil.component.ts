require('./../../node_modules/ng2-iq-select2/src/app/iq-select2/iq-select2.component.html')

import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { NgForm, FormGroup, FormBuilder } from '@angular/forms'
import { SpinnerComponent } from 'ng2-component-spinner'
import { SelectComponent } from 'ng2-select'
import { IMovil, IRegion, IPlazaImmex } from '../shared/interfaces'
import { MovilService, RegionService } from '../shared/services/index'
import { NotificationService, ItemsService, MappingService, EstatusRegistro } from '../shared/utils/index'
import { IqSelect2Component, IqSelect2Item, IqSelect2ResultsComponent } from 'ng2-iq-select2'
import { Observable } from 'rxjs/Rx'

@Component({   
    moduleId: module.id,
    selector: 'app-movil',
    templateUrl: 'movil.component.html'
})
export class MovilComponent implements OnInit{
    form: FormGroup;
    adapter: (region: IRegion) => IqSelect2Item;
    listaRegiones: (term: string) => Observable<IRegion[]>;

    public idMovil: number
    public movil: any
    public regionId: number = 0
    public plazaImmexId: number = 0
    public activeIdRegion: any = {}
    public activeIdPlazaImmex: any

    // public itemsRegiones: Array<Select2OptionData>;
    // public itemsPlazasImmex: Array<Select2OptionData>;

    public seCompletoOperacion: boolean = false
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
                private mappingService: MappingService,
                private formBuilder: FormBuilder){}

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
        

        this.adapter = (region: IRegion) => {
            return {
                id: String(region.id),
                text: region.nombreRegion,
                entity: region
            };
        }
        this.form = this.formBuilder.group({
            region: null
        });
    }

    /**
     * 
     */
    loadRegiones(){

        this.listaRegiones = (term: string) => this.regionService.getRegionesByEstatus(false, 1);

        // this.regionService.getRegionesByEstatus(false, 1)
        //     .subscribe((res: IRegion[]) => {                
        //         this.listaRegiones = [];
        //         if(res.length > 0){
        //             this.listaRegiones =
        //             this.itemsRegiones.push({
        //                 id: '0',
        //                 text: '-- Seleccione Región--'
        //             });

        //             for(let indexRegion = 0; indexRegion < res.length; indexRegion++){
        //                 let region = res[indexRegion];
        //                 this.itemsRegiones.push({
        //                     id: String(region.id),
        //                     text: String(region.nombreRegion)
        //                 })
        //             }
        //         }else{
        //             this.notificationService.printErrorMessage('No se encontraron regiones')
        //         }
        //         this.regionesLoaded = true
        //     },
        //     error => {
        //         this.notificationService.printErrorMessage("Error al cargar las Regiones " + error)
        //     })           
    }

    loadDetailsMovil(){
        this.movilService.getMovilDetails(this.idMovil)
            .subscribe((movil: IMovil) => {
                 this.movil = this.itemsService.getSerialized<IMovil>(movil)
                 this.EstatusMovil = ((this.movil.idEstatus === EstatusRegistro.Activo) ? true: false)
                 this.regionId = this.movil.regionId
                 this.plazaImmexId = this.movil.plazaImmexId
                 this.showSpinner = false   
            },
            error => {
                this.notificationService.printErrorMessage('Ocurrio un error al cargar el registro' +error)
            })
    }

    /**
     * Evento para el botón regresar
     */
    back(mensaje: string = ''){
        if(this.seCompletoOperacion)
            this.router.navigate(['/movil',{ mensaje: mensaje}])
        else
            this.router.navigate(['/movil'])
    }

    /**
     * 
     * @param regionId Representa el valor seleccionado en el campo Región.
     */
    onChangeSelectRegion(regionId: number){
        this.regionId = regionId

        // if(regionId != 0){
        //     this.showSpinner = true           
        //     this.regionService.getRegionDetails(regionId, true)
        //         .subscribe((region: IRegion)=> {
        //             this.itemsPlazasImmex = []
        //             if(region.plazasImmex.length > 0){
        //                 this.itemsPlazasImmex.push({
        //                     id: '0',
        //                     text: '-- Seleccione Plaza Immex --'
        //                 });

        //                 for(let indexPlaza= 0; indexPlaza < region.plazasImmex.length; indexPlaza++){
        //                     let plaza = region.plazasImmex[indexPlaza]
        //                     this.itemsPlazasImmex.push({
        //                         id: String(plaza.id),
        //                         text: String(plaza.nombrePlazaImmex)
        //                     })
        //                 }
        //        }else{
        //             this.notificationService.printErrorMessage('No se encontraron Plazas Immex para esta Región')
        //         } 
        //         this.showSpinner= false      
        //      }, 
        //      error => {
        //         this.notificationService.printErrorMessage('Ocurrio un problema la cargar las Plazas Immex')
        //         this.showSpinner= false
        //      })                
        // }else{
        //     this.itemsPlazasImmex = [];
        // }        
    }

    onChangeSelectPlazaImmex(plazaImmexId:number){
        this.plazaImmexId = plazaImmexId
    }


    crearMovil(formValues){
        this.showSpinner = true
        formValues.idEstatus = this.EstatusMovil
        formValues.regionId = this.regionId
        formValues.plazaImmexId = this.plazaImmexId

        this.movilService.createMovil(this.mappingService.mapMovilCreate(formValues))
            .subscribe((movilCreado: IMovil) => {
                this.showSpinner = false
                this.back('Movil creado correctamente')
            },
            error => {
                this.notificationService.printErrorMessage('No se pudo crear el movil: '+error)
            })
    }

    editarMovil(formValues){
         this.showSpinner = true
         formValues.idEstatus = this.EstatusMovil
         formValues.regionId = this.regionId
         formValues.plazaImmexId = this.plazaImmexId

         this.movilService.updateMovil(this.idMovil, this.mappingService.mapMovilCreate(formValues))
            .subscribe((movilCreado: IMovil) => {
                this.showSpinner = false
                this.seCompletoOperacion = true
                this.back('Movil actualizado correctamente')
            },
            error => {
                this.showSpinner = false
                this.notificationService.printErrorMessage('No se pudo crear el movil: '+error)                
            })
    }
}