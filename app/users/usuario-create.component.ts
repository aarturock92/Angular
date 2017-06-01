import { Component, OnInit, ViewChild }  from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

import { TabsetComponent  } from 'ng2-bootstrap'

import { PerfilUsuarioService } from '../shared/services/perfilusuario.service'

@Component({
    moduleId: module.id,
    selector: 'app-user-create',
    templateUrl: 'usuario-create.component.html'
})
export class UsuarioCrearComponent implements OnInit{
    
    @ViewChild('staticTabs') staticTabs: TabsetComponent

    constructor(private route:ActivatedRoute,
                private router: Router){}

    ngOnInit(){
        
    }

    selectTab(tab_id: number) {
      this.staticTabs.tabs[tab_id].active = true;
    }
 
    disableEnable() {
        this.staticTabs.tabs[2].disabled = ! this.staticTabs.tabs[2].disabled
    }

     back(){
        this.router.navigate(['/usuario'])
    }
    
}