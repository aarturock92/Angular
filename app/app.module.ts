import './rxjs-operators'

import { NgModule} from '@angular/core'
import { BrowserModule} from '@angular/platform-browser'
import { FormsModule} from '@angular/forms'
import { HttpModule} from '@angular/http'

import { PaginationModule, DatepickerModule, ModalModule, ProgressbarModule, TimepickerModule, TabsModule} from 'ng2-bootstrap'
import { JWBootstrapSwitchModule } from 'jw-bootstrap-switch-ng2'

import { AppComponent} from './app.component'
import { DateFormatPipe} from './shared/pipes/date-format.pipe'
import { HighlightDirective} from './shared/directives/highlight.directive'
import { HomeComponent} from './home/home.component'
import { MobileHideDirective} from './shared/directives/mobile-hide.directive'

import { ScheduleListComponent} from './schedules/schedule-list.component'

import { UserListComponent, UsuarioCrearComponent, UserEditComponent } from './users/index'
import { MovilCreateComponent, MovilEditComponent, MovilListComponent  } from  './movil/index'
import { MenuComponent } from './menu/index'

import { routing } from './app.routes'

import { RegionService, PlazaImmexService, MovilService, EstadoService, UsuarioService, PerfilUsuarioService, } from './shared/services/index'

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
        TabsModule.forRoot(),
        JWBootstrapSwitchModule
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
        MovilEditComponent,
        MovilCreateComponent,

        MenuComponent
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
