import './rxjs-operators'

import { NgModule} from '@angular/core'
import { BrowserModule} from '@angular/platform-browser'
import { FormsModule} from '@angular/forms'
import { HttpModule} from '@angular/http'

import { PaginationModule} from 'ng2-bootstrap'
import { DatepickerModule} from 'ng2-bootstrap'
import { ModalModule } from 'ng2-bootstrap'
import { ProgressbarModule} from 'ng2-bootstrap'
import { TimepickerModule} from 'ng2-bootstrap'
import { TabsModule} from 'ng2-bootstrap'

import { AppComponent} from './app.component'
import { DateFormatPipe} from './shared/pipes/date-format.pipe'
import { HighlightDirective} from './shared/directives/highlight.directive'
import { HomeComponent} from './home/home.component'
import { MobileHideDirective} from './shared/directives/mobile-hide.directive'

import { ScheduleListComponent} from './schedules/schedule-list.component'

import { UserListComponent} from './users/user-list.component'
import { UsuarioCrearComponent} from './users/usuario-create.component'
import { UserEditComponent } from './users/user-edit.component' 

import { MovilListComponent } from './movil/movil-list.component'
import { MovilEditComponent } from './movil/movil-edit.component'

import { routing } from './app.routes'

import { RegionService } from './shared/services/region.service'
import { PlazaImmexService } from './shared/services/plazaimmex.service'
import { MovilService } from './shared/services/movil.service'
import { EstadoService } from './shared/services/estado.service'
import { UsuarioService } from './shared/services/usuario.service'
import { PerfilUsuarioService} from './shared/services/perfilusuario.service' 
import { ConfigService} from './shared/utils/config.service' 
import { ItemsService} from './shared/utils/items.service'
import { MappingService} from './shared/utils/mapping.service'
import { NotificationService} from './shared/utils/notification.service'
import { AuthenticationService } from './shared/utils/authentication.service'

@NgModule({
    imports:[
        BrowserModule,
        DatepickerModule,
        FormsModule,
        HttpModule,
        ModalModule.forRoot(),
        ProgressbarModule.forRoot(),
        PaginationModule.forRoot(),
        routing,
        TimepickerModule.forRoot(),
        TabsModule.forRoot()
    ],
    declarations: [
        AppComponent,
        DateFormatPipe,
        HighlightDirective,
        HomeComponent,
        MobileHideDirective,
        ScheduleListComponent,
        
        UserListComponent,
        UsuarioCrearComponent,
        UserEditComponent,

        MovilListComponent,
        MovilEditComponent

    ],
    providers: [
        ConfigService,
        PlazaImmexService,
        RegionService,
        EstadoService,
        UsuarioService,
        MovilService,
        PerfilUsuarioService,
        ItemsService,
        MappingService,
        NotificationService,
        AuthenticationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule{}
