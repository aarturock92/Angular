import { Injectable} from '@angular/core' 
import { ItemsService} from './items.service'
import { IMovil } from '../interfaces'

@Injectable()
export class MappingService{

    constructor(private itemsService: ItemsService){}

    mapMovilCreate(formValues: any): IMovil{
        var movil: IMovil = {
            id: 0,
            regionId: formValues.regionId,
            plazaImmexId: formValues.plazaImmexId,
            marca: formValues.marca,
            modelo: formValues.modelo,
            numeroTelefono: formValues.numeroTelefono,
            numeroSerie: formValues.numeroSerie,
            imei: formValues.imei,
            idEstatus: formValues.idEstatus
        } 
        
        return movil
    }
}