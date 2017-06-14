import { Component, OnInit, ViewChild, OnChanges }  from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { TabsetComponent  } from 'ng2-bootstrap'
import { NotificationService, ItemsService } from '../shared/utils/index'
import { PerfilUsuarioService, RegionService, PlazaImmexService } from '../shared/services/index'
import { IPerfilUsuario, IRegion, IPlazaImmex } from '../shared/interfaces'
import { SelectComponent } from 'ng2-select'


@Component({
    moduleId: module.id,
    selector: 'app-user-create',
    templateUrl: 'usuario-create.component.html'
})
export class UsuarioCrearComponent implements OnInit, OnChanges{
    public user: any = {}
    
    perfilUsuarios: IPerfilUsuario[]
    loadedPerfilesUsuario: boolean = false
  
    public itemsRegiones: Array<any> = []
    public itemsPlazasImmex: Array<any> = []
    public itemsPlazasOxxo: Array<any> = []
    public itemsDistritos: Array<any> = []

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
                private notificationService: NotificationService,
                private itemsService: ItemsService){}

    ngOnInit(){
        this.loadPerfilesUsuario()
        this.loadRegiones()
    }

    ngOnChanges(){

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
        
        this.regionService.getRegionDetails(idRegion,true)
            .subscribe((res: IRegion) => {
                this.itemsPlazasImmex = [] 
                var plazasImmex = res.plazasImmex
                for(var indexPlazaImmex = 0;indexPlazaImmex < plazasImmex.length; indexPlazaImmex++){
                     this.itemsPlazasImmex.push({
                        id: plazasImmex[indexPlazaImmex].id,
                        text: plazasImmex[indexPlazaImmex].nombrePlazaImmex
                    })
                }    
            },
            error => {
                this.notificationService.printErrorMessage('Error al cargar las plazas Immex: '+error)
            })
    }

    onChangeSelectPlazaImmex(idPlazaImmex: number){
        
        this.plazaImmexService.getPlazaImmexDetails(idPlazaImmex, true)
            .subscribe((res: IPlazaImmex) => {
                this.itemsPlazasOxxo = []
                var plazasOxxo = res.plazasOxxo
                for(var indexPlazaOxxo = 0; indexPlazaOxxo < plazasOxxo.length; indexPlazaOxxo++){
                    this.itemsPlazasOxxo.push({
                        id: plazasOxxo[indexPlazaOxxo].id,
                        text: plazasOxxo[indexPlazaOxxo].nombrePlazaOxxo
                    })
                }
            },
            error => {
                this.notificationService.printErrorMessage('Error al cargar las Plazas Immex: '+error)
            })
    }


    /**
     * Metodo para cargar los perfiles de Usuario a partir de un servicio.
     */
    loadPerfilesUsuario(){
        this.perfilUsuarioService.getListPerfilesUsuario(1)
            .subscribe((res: IPerfilUsuario[]) => {
                this.perfilUsuarios = res
                this.loadedPerfilesUsuario = true
            }, 
            error => {
                this.notificationService.printErrorMessage('Error al cargar los perfiles de Usuario: '+ error)
            });
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