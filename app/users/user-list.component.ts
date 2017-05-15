import { Component, OnInit, ViewChild, Input, Output, trigger, state, style,animate, transition }  from '@angular/core'

import { ModalDirective } from 'ng2-bootstrap'
import { DataService } from '../shared/services/data.service'
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
    apiHost: string
    usuarios: IUsuario[]


    public itemsPerPage: number = 10;
    public totalItems: number = 0;
    public currentPage: number = 0;

    @ViewChild('modal')
    modal: any

    usuarioDetails: IUsuario
    selectedUsuarioId: number
    selectedUsuarioLoaded: boolean= false

    constructor(private dataService: DataService,
                private itemsService: ItemsService,
                private notificationService: NotificationService,
                private configService: ConfigService){}

    ngOnInit(){
        this.apiHost = this.configService.getApiHost()
    }

    loadUsuarios(){
        // this.dataService.getUsers()
    }
}