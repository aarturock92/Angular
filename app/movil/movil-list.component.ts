import { Component, OnInit, trigger, state, style,animate, transition } from '@angular/core'
import { MovilService } from  '../shared/services/index'
import { ItemsService, NotificationService, ConfigService } from '../shared/utils/index'
import { IMovil, Pagination, PaginatedResult } from '../shared/interfaces'
import { SpinnerComponent } from 'ng2-component-spinner'
import { ActivatedRoute } from '@angular/router'

@Component({
    moduleId: module.id,
    selector: 'app-movil-list',
    templateUrl: 'movil-list.component.html',
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
export class MovilListComponent implements OnInit{

    public moviles:IMovil[]
    public currentPage: number = 0
    public itemsPerPage: number= 10
    public totalItems: number = 0
    public showSpinner: boolean = true

    constructor(private movilService: MovilService,
                private itemsService: ItemsService,
                private notificationService: NotificationService,
                private activatedRoute: ActivatedRoute){}

    
    ngOnInit(){
        this.loadMoviles();
        this.activatedRoute.params.subscribe(params =>  {
            if(typeof(params['mensaje']) != 'undefined')
                this.notificationService.printSuccessMessage(params['mensaje'])
        })
    }


    loadMoviles(){
        this.movilService.getMovilesPagination(this.currentPage, this.itemsPerPage)
            .subscribe((res: PaginatedResult<IMovil[]>) => {
                this.moviles = res.result
                this.totalItems = res.totalCount
                this.showSpinner = false
            },
            error=>{
                this.notificationService.printErrorMessage('Fallo la carga de Moviles ' +error)
            })
    }

    pageChanged(event: any): void{
        this.showSpinner = true;
        this.currentPage = event.page -1
        this.loadMoviles()
    }

    removeMovil(movil: IMovil){
        this.notificationService.openConfirmationDialog("¿Ésta seguro de eliminar el movil con el número de telefono: " + movil.numeroTelefono, () => {
             this.showSpinner = true
             this.movilService.deleteMovil(movil.id)
                        .subscribe(() => {
                            this.itemsService.removeItemFromArray<IMovil>(this.moviles, movil)
                            this.showSpinner = false
                            this.notificationService.printSuccessMessage('El movil con el número telefonico ' + movil.numeroTelefono + ' ha sido eliminado')
                        },
                        error => {
                            this.notificationService.printErrorMessage('Ocurrio un error al eliminar el movil '+ error)
                        })  
        })
    }

}