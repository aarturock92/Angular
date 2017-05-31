import { Component, OnInit, ViewChild }  from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { TabsetComponent  } from 'ng2-bootstrap'

@Component({
    moduleId: module.id,
    selector: 'app-user-create',
    templateUrl: 'usuario-create.component.html'
})
export class UsuarioCrearComponent implements OnInit{
    

    @ViewChild('staticTabs') staticTabs: TabsetComponent
    
    ngOnInit(){

    }

    selectTab(tab_id: number) {
      this.staticTabs.tabs[tab_id].active = true;
    }
 
    disableEnable() {
        this.staticTabs.tabs[2].disabled = ! this.staticTabs.tabs[2].disabled
    }
    
}