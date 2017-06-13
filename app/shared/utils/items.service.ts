import { Injectable} from '@angular/core'
import { Predicate }  from '../interfaces'

import * as _ from 'lodash'

@Injectable()
export class ItemsService{
    constructor(){

    }

    /*
    *Removes an item from an array using the lodas library.
    */
    removeItemFromArray<T>(array: Array<T>, item: any){
        _.remove(array, function(current){
            return JSON.stringify(current) === JSON.stringify(item)
        })
    }

    /*
    *
    */
    removeItems<T>(array: Array<T>, predicate: Predicate<T>){
        _.remove(array, predicate)
    }

    /*
    *Finds a specific item in an array using a predicate and repspaces it.
    */
    setItem<T>(array: Array<T>, predicate: Predicate<T>, item: T){
        var _oldItem = _.find(array, predicate)
        if(_oldItem){
            var index = _.indexOf(array, _oldItem)
            array.splice(index, 1, item)
        }else{
            array.push(item)
        }
    }

    getItemFromArray<T>(array: Array<T>, predicate:Predicate<T>){
        var item = _.find(array, predicate)
        if(typeof(item) !== 'undefined')
            return item
        else
            return null
    }

    /*
    *Adds an item to zero index
    */
    addItemToStart<T>(array: Array<T>, item:any){
        array.splice(0,0, item)
    }

    /*
    From an array of type T, select all values of type R for property
    */
    getPropertyValues<T,R>(array: Array<T>, property: string): R{
        var result = _.map(array, property)
        return <R><any>result
    }

    /*
    Util method to serialize a string to a specific Type
    */
    getSerialized<T>(arg: any):T{
        return <T>JSON.parse(JSON.stringify(arg))
    }

}