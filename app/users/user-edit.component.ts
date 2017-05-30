import { Component, OnInit, ViewChild } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { NgForm } from '@angular/forms'

import { TabsetComponent  } from 'ng2-bootstrap'
import { UsuarioService } from '../shared/services/usuario.service'
import { ItemsService } from '../shared/utils/items.service'
import { NotificationService } from '../shared/utils/notification.service'
import { ConfigService } from '../shared/utils/config.service'
import { MappingService } from '../shared/utils/mapping.service'
import { IUsuario } from '../shared/interfaces'

@Component({
    moduleId: module.id,
    selector: 'app-user-edit',
    templateUrl: 'user-edit.component.html'
})
export class UserEditComponent implements OnInit{
    private idUser:number
    private user: IUsuario
    userLoaded: boolean = false

    @ViewChild('staticTabs') staticTabs: TabsetComponent

    constructor(private route: ActivatedRoute,
                private router:Router,
                private usuarioService: UsuarioService,
                private itemsService: ItemsService,
                private notificationService: NotificationService){}

    ngOnInit(){
         this.idUser = +this.route.snapshot.params['id']
         this.loadUserDetails()
    }

    loadUserDetails(){
        this.usuarioService.getUsuarioDetails(this.idUser)
            .subscribe((user :IUsuario) => {
                this.user = this.itemsService.getSerialized<IUsuario>(user)
                this.userLoaded = true
            },
            error => {
                this.notificationService.printErrorMessage('Failed to load user'+ error);
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