import { Component, OnInit, ViewChild } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { NgForm } from '@angular/forms'
import { TabsetComponent  } from 'ng2-bootstrap'

import { UsuarioService } from '../shared/services/usuario.service'
import { EstadoService } from '../shared/services/estado.service'
import { PerfilUsuarioService } from '../shared/services/perfilusuario.service'

import { ItemsService } from '../shared/utils/items.service'
import { NotificationService } from '../shared/utils/notification.service'
import { ConfigService } from '../shared/utils/config.service'
import { MappingService } from '../shared/utils/mapping.service'
import { IUsuario, IEstado, IMunicipio, IPerfilUsuario } from '../shared/interfaces'

@Component({
    moduleId: module.id,
    selector: 'app-user-edit',
    templateUrl: 'user-edit.component.html'
})
export class UserEditComponent implements OnInit{
    private idUser:number
    private user: IUsuario
    userLoaded: boolean = false
    estadosLoaded: boolean = false
    municipiosLoaded: boolean = false
    perfilesUsuarioLoaded: boolean = false

    private estados:IEstado[]
    private municipios:IMunicipio[]
    private perfilUsuarios: IPerfilUsuario[]

    @ViewChild('staticTabs') staticTabs: TabsetComponent

    constructor(private route: ActivatedRoute,
                private router:Router,
                private usuarioService: UsuarioService,
                private estadoService: EstadoService,
                private perfilUsuarioService: PerfilUsuarioService,
                private itemsService: ItemsService,
                private notificationService: NotificationService){}

    ngOnInit(){
         this.idUser = +this.route.snapshot.params['id']
         this.loadEstadosByStatus()
         this.loadPerfilesUsuarioByStatus()         
         this.loadUserDetails()        
    }

    loadUserDetails(){
        this.usuarioService.getUsuarioDetails(this.idUser)
            .subscribe((user :IUsuario) => {
                this.user = this.itemsService.getSerialized<IUsuario>(user)
                console.log("this.user",this.user);
                this.userLoaded = true
                this.onChangeSelectEstado(this.user.idEstado)
            },
            error => {
                this.notificationService.printErrorMessage('Failed to load user'+ error);
            })            
    }

    loadEstadosByStatus(){
        this.estadoService.getEstadoByStatus(false,1)
            .subscribe((res: IEstado[]) => {
                this.estados = res
                this.estadosLoaded = true
            },
            error => {
                this.notificationService.printErrorMessage('Failed to load estados ' + error)
            })
    }

    loadPerfilesUsuarioByStatus(){
        this.perfilUsuarioService.getListPerfilesUsuario(1)
            .subscribe((res: IPerfilUsuario[]) => {
                this.perfilUsuarios = res
                this.perfilesUsuarioLoaded = true
            }, 
            error => {
                this.notificationService.printErrorMessage('Failed to load Perfiles Usuarios '+ error)
            })
    }

    onChangeSelectEstado(idEstado){
        this.estadoService.getEstadoDetails(idEstado, true)
            .subscribe((res: IEstado) => {
                let data = res
                this.municipios = data.municipios
                this.municipiosLoaded = true
            },
            error => {
                this.notificationService.printErrorMessage('Failed to load municipios'+ error)
            })
    }


    back(){
        this.router.navigate(['/usuario'])
    }

    selectTab(tab_id: number) {
      this.staticTabs.tabs[tab_id].active = true;
    }
 
    disableEnable() {
        this.staticTabs.tabs[2].disabled = ! this.staticTabs.tabs[2].disabled
    }
}