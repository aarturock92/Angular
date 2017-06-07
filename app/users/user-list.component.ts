import { Component, OnInit, ViewChild, Input, Output, trigger, state, style,animate, transition }  from '@angular/core'

// import { ModalDirective } from 'ng2-bootstrap'
import { UsuarioService } from '../shared/services/usuario.service'
import { ItemsService} from '../shared/utils/items.service'
import { NotificationService } from '../shared/utils/notification.service'
import { ConfigService} from '../shared/utils/config.service'
import { IUsuario, Pagination, PaginatedResult } from '../shared/interfaces'


@Component({
    moduleId: module.id,
    selector: 'app-users',
    templateUrl: 'user-list.component.html',
    animations: [
        trigger('flyInOut', [
            state('in', style({ opacity: 1, transform: 'translateX(0)'})),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }),
                animate('0.5s ease-in')
            ]),
            transition('* => void', [
                animate('0.2s 10 ease-out', style({
                    opacity: 0,
                    transform: 'translateX(100%)'
                }))
            ])
        ])
    ]
})

export class UserListComponent{
    public usuarios: IUsuario[]
    public itemsPerPage: number = 10
    public totalItems: number = 0
    public currentPage: number = 0

    public usuarioDetails: IUsuario
    public selectedUsuarioId: number
    public selectedUsuarioLoaded: boolean= false

    constructor(private usuarioService: UsuarioService,
                private itemsService: ItemsService,
                private notificationService: NotificationService,
                private configService: ConfigService){}

    ngOnInit(){
        this.loadUsuarios()
    }

    loadUsuarios(){
        this.usuarioService.getUsuarios(this.currentPage, this.itemsPerPage)
            .subscribe((res: PaginatedResult<IUsuario[]>) => {
                this.usuarios = res.result
                this.totalItems = res.totalCount
            },
            error => {
                this.notificationService.printErrorMessage('Fallo la carga de Usuarios'+ error)
            })
    }

    removeUsuario(usuario: IUsuario){
        this.notificationService.openConfirmationDialog('Are you sure you want to delete this user?', 
                () => {
                    this.usuarioService.deleteUser(usuario.id)
                        .subscribe(() => {
                            this.itemsService.removeItemFromArray<IUsuario>(this.usuarios, usuario)
                            this.notificationService.printSuccessMessage(usuario.nombreUsuario + ' has been deleted.')
                        },
                        error => {
                            this.notificationService.printErrorMessage('Failed to delete '+ usuario + ' ' +error)
                        })                        
                });
    }

}