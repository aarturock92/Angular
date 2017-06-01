import { Injectable} from '@angular/core' 
import { ItemsService} from './items.service'

@Injectable()
export class MappingService{

    constructor(private itemsService: ItemsService){}


}