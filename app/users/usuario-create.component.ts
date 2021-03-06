import { Component, OnInit, ViewChild, OnDestroy }  from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { TabsetComponent  } from 'ng2-bootstrap'
import { NotificationService, ItemsService } from '../shared/utils/index'
import { PerfilUsuarioService, RegionService, PlazaImmexService, PlazaOxxoService, EstadoService } from '../shared/services/index'
import { IPerfilUsuario, IRegion, IPlazaImmex, IPlazaOxxo, IEstado, IMovil } from '../shared/interfaces'
import { SelectComponent } from 'ng2-select'
import { SpinnerComponent } from 'ng2-component-spinner'

@Component({
    moduleId: module.id,
    selector: 'app-user-create',
    templateUrl: 'usuario-create.component.html'
})
export class UsuarioCrearComponent implements OnInit{
    public user: any = {}
    
    perfilUsuarios: IPerfilUsuario[]

    loadedPerfilesUsuario: boolean = false
    loadedMoviles:boolean = false
    loadedPlazaOxxo: boolean = false
  
    public itemsRegiones: Array<any> = []
    public itemsPlazasImmex: Array<any> = []
    public itemsPlazasOxxo: Array<any> = []
    public itemsDistritos: Array<any> = []
    public itemsPerfilesUsuario: Array<any> = []
    public itemsEstados: Array<any> = []
    public itemsMunicipios: Array<any> = []
    public itemsMoviles: Array<any> = []
    public itemsVehiculos: Array<any> = []

    public showSpinner: boolean = false
    //Variables Controles
    esControlMultiple: boolean = false
    selectedAdministracion: boolean = false
    selectedSupervision: boolean = false
    selectedOperativo: boolean = false
 

    @ViewChild('staticTabs') staticTabs: TabsetComponent

    constructor(private route:ActivatedRoute,
                private router: Router,
                private perfilUsuarioService: PerfilUsuarioService,
                private regionService: RegionService,
                private plazaImmexService: PlazaImmexService,
                private plazaOxxoService: PlazaOxxoService,
                private estadoService: EstadoService,
                private notificationService: NotificationService,
                private itemsService: ItemsService){}

    ngOnInit(){
        this.loadPerfilesUsuario()
        this.loadRegiones()
        this.loadEstados()
        this.showSpinner = false
    }

    /**
    * Metodo que ejecuta el control Select al realizar el evento change.
    * @param idPerfilUsuario  
    */
    onChangeSelectPerfilUsuario(idPerfilUsuario: number){
        let perfilUsuario =  this.itemsService.getItemFromArray<IPerfilUsuario>(this.perfilUsuarios, (p) => p.id == idPerfilUsuario)
        this.selectedAdministracion = false
        this.selectedSupervision = false
        this.selectedOperativo = false
        this.esControlMultiple = perfilUsuario.asignacionMultiple
        
        switch(perfilUsuario.jerarquiaId){
           //Administración
           case 1:
            this.selectedAdministracion = true
            break;           
           //Supervisión
           case 2:
            this.selectedSupervision = true
            break;
           //Operativo
           case 3:
            this.selectedOperativo = true            
            break;           
        }
    }

    /**
     * Metodo que ejecuta el control de Región 
     * @param idRegion 
     */
    onChangeSelectRegion(idRegion: number){
        this.showSpinner = true
        this.regionService.getRegionDetails(idRegion,true)
            .subscribe((res: IRegion) => {
                this.itemsPlazasImmex = [] 
                this.itemsPlazasOxxo = []
                this.itemsDistritos = []

                if(res.plazasImmex.length> 0){
                    var plazasImmex = res.plazasImmex
                    for(var indexPlazaImmex = 0;indexPlazaImmex < plazasImmex.length; indexPlazaImmex++){
                         this.itemsPlazasImmex.push({
                            id: plazasImmex[indexPlazaImmex].id,
                            text: plazasImmex[indexPlazaImmex].nombrePlazaImmex
                        })
                    }   
                }else{
                    this.notificationService.printErrorMessage('No se encontraron Plazas Immex en esta Región')
                }  
                this.showSpinner = false               
            },
            error => {
                this.notificationService.printErrorMessage('Error al cargar las plazas Immex: '+error)
            })
    }

    /**
     * 
     * @param idPlazaImmex 
     */
    onChangeSelectPlazaImmex(idPlazaImmex: number){
        this.showSpinner = true
        this.loadPlazasImmex(idPlazaImmex)
        this.loadMovilesByIdPlazaImmex(idPlazaImmex)
    }

    loadPlazasImmex(idPlazaImmex:number){
         this.plazaImmexService.getPlazaImmexDetails(idPlazaImmex, true)
            .subscribe((res: IPlazaImmex) => {
                this.itemsPlazasOxxo = []
                this.itemsDistritos = []
                if(res.plazasOxxo.length> 0){
                    let plazasOxxo = res.plazasOxxo
                    for(let indexPlazaOxxo = 0; indexPlazaOxxo < plazasOxxo.length; indexPlazaOxxo++){
                        this.itemsPlazasOxxo.push({
                            id: plazasOxxo[indexPlazaOxxo].id,
                            text: plazasOxxo[indexPlazaOxxo].nombrePlazaOxxo
                        })
                    }    
                }else{
                    this.notificationService.printErrorMessage('No se encontraron Plazas Oxxo en esta Plaza Immex')
                }
                this.showSpinner = false                
            },
            error => {
                this.notificationService.printErrorMessage('Error al cargar las Plazas Immex: '+error)
            })
    }

    loadMovilesByIdPlazaImmex(idPlazaImmex:number){
        this.plazaImmexService.getMovilesByIdPlazaImmex(idPlazaImmex,1)
            .subscribe((res: IMovil[]) => {
                this.itemsMoviles = [];
                if(res.length > 0){
                    for(let indexMovil = 0; indexMovil < res.length; indexMovil++){
                        this.itemsMoviles.push({
                            id: res[indexMovil].id,
                            text: res[indexMovil].numeroTelefono
                        })
                    }
                }else{
                    this.notificationService.printErrorMessage('No se encontraron moviles en esta Plaza Immex')
                }
                this.showSpinner = false
            }, 
            error => {
                this.notificationService.printErrorMessage('Error al cargar Moviles')
            })
    }

    /**
     * 
     * @param idPlazaOxxo 
     */
    onChangeSelectPlazaOxxo(idPlazaOxxo: number){
        this.showSpinner = true
        this.plazaOxxoService.getPlazaOxxoDetails(idPlazaOxxo, true)
            .subscribe((res: IPlazaOxxo) => {
                this.itemsDistritos = []
                if(res.distritos.length > 0){
                    let distritos = res.distritos
                    for(let indexDistrito = 0; indexDistrito < distritos.length; indexDistrito++){
                        this.itemsDistritos.push({
                            id: distritos[indexDistrito].id,
                            text: distritos[indexDistrito].nombreDistrito
                        })
                    }
                }else{
                    this.notificationService.printErrorMessage('No se encontraron distritos en esta Plaza Oxxo')
                }
                this.showSpinner = false                
            }, 
            error => {
                this.notificationService.printErrorMessage('Error al cargar los distritos: '+error)
            })
    }


    /**
     * Metodo para cargar los perfiles de Usuario a partir de un servicio.
     */
    loadPerfilesUsuario(){
        this.perfilUsuarioService.getListPerfilesUsuario(1)
            .subscribe((res: IPerfilUsuario[]) => {
                if(res.length > 0){
                    for(var indexPerfil = 0; indexPerfil < res.length; indexPerfil++){
                        this.itemsPerfilesUsuario.push({
                            id: res[indexPerfil].id,
                            text: res[indexPerfil].nombre
                        })
                    }   

                    this.perfilUsuarios = res                 
                }else{
                    this.notificationService.printErrorMessage("No se encontraron perfiles de Usuario")
                }
                this.loadedPerfilesUsuario = true
            }, 
            error => {
                this.notificationService.printErrorMessage('Error al cargar los perfiles de Usuario: '+ error)
            });
    }

    /**
     * Metodo para cargar los Estados
     */
    loadEstados(){
        this.estadoService.getEstadoByStatus(false, 1)
            .subscribe((res: IEstado[]) => {
                this.itemsEstados = []
                if(res.length > 0){
                    for(var indexEstado = 0; indexEstado < res.length; indexEstado++){
                        this.itemsEstados.push({
                            id: res[indexEstado].id,
                            text: res[indexEstado].nombre
                        })
                    }   
                }else{
                    this.notificationService.printErrorMessage('No se encontraron estados')
                }
            },
            error => {
                this.notificationService.printErrorMessage('Error al cargar el Catalogo de Estados')
            })
    }

     /**
     * Metodo que carga los municipios a partir de un IdEstado
     */
    onChangeSelectEstado(idEstado: number){
        this.showSpinner = true
        this.estadoService.getEstadoDetails(idEstado, true)
            .subscribe((res: IEstado) => {
                this.itemsMunicipios = []
                if(res.municipios.length > 0){
                    var municipios = res.municipios
                    for(var indexMunicipio = 0; indexMunicipio < municipios.length; indexMunicipio++){
                        this.itemsMunicipios.push({
                            id: municipios[indexMunicipio].id,
                            text: municipios[indexMunicipio].nombre
                        })
                    }                   
                }else{
                    this.notificationService.printErrorMessage('No se encontraron municipios')
                }
                this.showSpinner = false
            },
            error => {
                this.notificationService.printErrorMessage("Error al cargar el Catalogo de Municipios")
            })
    }

    loadRegiones(){
        this.regionService.getRegionesByEstatus(false, 1)
            .subscribe((res: IRegion[]) => {
                  for(var indexRegion = 0; indexRegion< res.length; indexRegion++){
                    this.itemsRegiones.push({
                        id: res[indexRegion].id,
                        text: res[indexRegion].nombreRegion
                    })
                  } 
            },
            error => {
                this.notificationService.printErrorMessage('Error al cargar las regiones '+error)     
            })
    }

    /**
     * 
     * @param tab_id 
     */
    selectTab(tab_id: number) {
      this.staticTabs.tabs[tab_id].active = true;
    }
 
    /**
     * 
     */
    disableEnable() {
        this.staticTabs.tabs[2].disabled = ! this.staticTabs.tabs[2].disabled
    }

    /**
     * Metodo que se ejecuta al dar click en el botón atras.
     */
    back(){
        this.router.navigate(['/usuario'])
    }
    
}