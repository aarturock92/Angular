import { Component, OnInit, ViewChild, Input, Output, trigger, state, style, animate, transition} from '@angular/core'

import { ModalDirective} from 'ng2-bootstrap'
import { DataService } from '../shared/services/data.service'
import { DateFormatPipe} from '../shared/pipes/date-format.pipe'
import { ItemsService} from '../shared/utils/items.service'
import { NotificationService} from '../shared/utils/notification.service'
import { ConfigService} from '../shared/utils/config.service'
import { IEstado} from '../shared/interfaces'

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

    apiHost: string
    schedules: IEstado[]

    constructor(private dataService: DataService,
                private itemsService: ItemsService,
                private notificationService: NotificationService,
                private configService:ConfigService){}

    ngOnInit(){
        this.apiHost = this.configService.getApiHost()
        this.loadSchedules()
    }

    loadSchedules(){
        this.dataService.getEstados()
            .subscribe((res: IEstado[]) => {
                debugger;
                console.log("res",res)
                this.schedules =  res;
            },
            error => {
             this.notificationService.printErrorMessage('Failed to load schedules' +error)   
            })            
    }

}