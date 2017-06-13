import { Component, OnInit, ViewChild }  from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { TabsetComponent  } from 'ng2-bootstrap'
import { NotificationService, ItemsService } from '../shared/utils/index'
import { PerfilUsuarioService, RegionService } from '../shared/services/index'
import { IPerfilUsuario, IRegion } from '../shared/interfaces'
import { SelectComponent } from 'ng2-select'


@Component({
    moduleId: module.id,
    selector: 'app-user-create',
    templateUrl: 'usuario-create.component.html'
})
export class UsuarioCrearComponent implements OnInit{
    public user: any = {}
    
    perfilUsuarios: IPerfilUsuario[]
    regiones: IRegion[]
    loadedPerfilesUsuario: boolean = false

    public itemsRegiones: Array<any> = []

    //Variables Controles
    esControlMultipleRegion: boolean = false
    selectedAdministracion: boolean = false

    @ViewChild('staticTabs') staticTabs: TabsetComponent

    constructor(private route:ActivatedRoute,
                private router: Router,
                private perfilUsuarioService: PerfilUsuarioService,
                private regionService: RegionService,
                private notificationService: NotificationService,
                private itemsService: ItemsService){}

    ngOnInit(){
        this.loadPerfilesUsuario()
        this.loadRegiones()
    }


    onChangeSelectPerfilUsuario(idPerfilUsuario: number){

        let perfilUsuario =  this.itemsService.getItemFromArray<IPerfilUsuario>(this.perfilUsuarios, (p) => p.id == idPerfilUsuario)
        switch(perfilUsuario.jerarquiaId){
           //Administración
           case 1:
            this.selectedAdministracion = true

            if(perfilUsuario.asignacionMultiple)
               this.esControlMultipleRegion = true     
            else
               this.esControlMultipleRegion = false
            break;
           //Supervisión
           case 2:
            this.selectedAdministracion = false
            break;
           //Operativo
           case 3:
            this.selectedAdministracion = false
            
            break;           
        }
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