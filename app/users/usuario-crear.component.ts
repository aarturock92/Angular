import { Component, OnInit, ViewChild, Input, Output, trigger, state, style,animate, transition }  from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'


@Component({
    moduleId: module.id,
    templateUrl: 'usuario-crear.component.html',
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
export class UsuarioCrearComponent{
    nombreUsuario: FormControl
    nombre: FormControl
    primerApellido: FormControl
    segundoApellido: FormControl
    sexo: FormControl
    calle: FormControl
    
}