import { Component, OnInit, ViewChild, Input, Output, trigger, state, style,animate, transition }  from '@angular/core'
import { ModalDirective} from 'ng2-bootstrap'
import { EstadoService } from '../shared/services/index'
import { DateFormatPipe} from '../shared/pipes/date-format.pipe'
import { ItemsService, NotificationService, ConfigService} from '../shared/utils/index'
import { IEstado, Pagination, PaginatedResult} from '../shared/interfaces'

@Component({
    moduleId: module.id,
    selector: 'app-schedules',
    templateUrl: 'schedule-list.component.html',
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
export class ScheduleListComponent implements OnInit{
    @ViewChild('childModal') public childModal: ModalDirective

    apiHost: string
    estados: IEstado[]

    public itemsPerPage: number = 10;
    public totalItems: number = 0;
    public currentPage:number = 0;

    @ViewChild('modal')
    modal: any
    
    estadoDetails: IEstado
    selectedEstadoId: number
    selectedEstadoLoaded: boolean = false

    constructor(private estadoService: EstadoService,
                private itemsService: ItemsService,
                private notificationService: NotificationService,
                private configService:ConfigService){}

    ngOnInit(){
        this.loadEstados()
    }

    loadEstados(){
        this.estadoService.getEstados(this.currentPage, this.itemsPerPage)
            .subscribe((res: PaginatedResult<IEstado[]>) =>{
                this.estados = res.result
                this.totalItems = res.totalCount
            },
            error => {
             this.notificationService.printErrorMessage('Fallo la carga de Estados ' +error)   
            })            
    }

    pageChanged(event:any):void{
        this.currentPage = event.page -1;
        this.loadEstados()
    }

    viewEstadoDetails(id:number){
        this.selectedEstadoId = id

        this.estadoService.getEstadoDetails(this.selectedEstadoId, true)
            .subscribe((estado: IEstado) =>{
                this.estadoDetails = this.itemsService.getSerialized<IEstado>(estado)
                this.selectedEstadoLoaded = true
                this.childModal.show()
            },
            error => {
                this.notificationService.printErrorMessage('Failed to load schedule. '+ error)
            })
    }

    public hideChildModal(): void{
        this.childModal.hide()
    }

}