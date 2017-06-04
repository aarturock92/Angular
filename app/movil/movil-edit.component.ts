import { Component, OnInit } from '@angular/core' 
import { Router, ActivatedRoute } from '@angular/router'

import {MovilService } from '../shared/services/movil.service'

import { ItemsService } from '../shared/utils/items.service'
import { NotificationService } from '../shared/utils/notification.service'
import { ConfigService } from '../shared/utils/config.service'
import { MappingService } from '../shared/utils/mapping.service'
import { IMovil } from '../shared/interfaces'

@Component({
    moduleId: module.id,
    selector: 'app-movil-edit',
    templateUrl: 'movil-edit.component.html'
})
export class MovilEditComponent implements OnInit{
    private movil: IMovil
    private idMovil: number

    private movilLoaded: boolean = false

    constructor(private route: ActivatedRoute,
                private router:Router,
                private itemsService: ItemsService,
                private notificationService: NotificationService,
                private movilService: MovilService){}

    ngOnInit(){
        this.idMovil = +this.route.snapshot.params['id']
    }


    loadMovilDetails(){
        this.movilService.getMovilDetails(this.idMovil)
            .subscribe((movil: IMovil) => {
                this.movil = this.itemsService.getSerialized<IMovil>(movil)
                this.movilLoaded = true
            },
            error => {
                this.notificationService.printErrorMessage('Failed to load movil '+error)
            })
    }
}

