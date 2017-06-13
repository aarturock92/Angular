import { Component, OnInit} from '@angular/core'
import { PerfilUsuarioService } from '../shared/services/index'
import { NotificationService } from '../shared/utils/index'
import { IMenu } from '../shared/interfaces'

@Component({
    moduleId: module.id,
    selector: 'menu-app',
    templateUrl: 'menu.component.html'
})
export class MenuComponent implements OnInit{
    private idPerfilUsuario: number = 1
    private MenuApp: IMenu[]

    constructor(private perfilUsuarioService: PerfilUsuarioService,
                private notificationService: NotificationService){}

    ngOnInit(){
        this.loadMenuByPerfilUsuarioId()
    }

    loadMenuByPerfilUsuarioId(){
        this.perfilUsuarioService.getMenuByPerfilUsuarioId(this.idPerfilUsuario)
            .subscribe((res: IMenu[]) => {
                this.MenuApp = res
            },
            error => {
                this.notificationService.printErrorMessage('Surgio un error al crear el menu ' + error)
            })            
    }
}