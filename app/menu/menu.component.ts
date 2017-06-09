import { Component} from '@angular/core'

@Component({
    moduleId: module.id,
    selector: 'menu-app',
    templateUrl: 'menu.component.html'
})
export class MenuComponent{
   public MENUJSON = [
       {  
           tituloMenu: 'Configuración', 
           subMenus: [
                { tituloSubMenu: 'Estados', url: '/estado' },
                { tituloSubMenu: 'Usuarios', url: '/usuario' },
                { tituloSubMenu: 'Moviles', url: '/movil' },
           ],
           url: '',
           classCss: 'fa fa-wrench fa-fw'
       },
       {  
           tituloMenu: 'Encuesta', 
           subMenus: [
                { tituloSubMenu: 'Encuestas', url: '' },
                { tituloSubMenu: 'Catalogo Respuestas', url: '' },
           ],
           url: '',
           classCss: 'fa fa-files-o fa-fw'
        }
   ]
}