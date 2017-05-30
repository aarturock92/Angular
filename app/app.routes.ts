import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent} from './home/home.component'
import { ScheduleListComponent} from './schedules/schedule-list.component'
import { UserListComponent } from './users/user-list.component'
import { UsuarioCrearComponent } from './users/usuario-crear.component'
import { UserEditComponent } from './users/user-edit.component'

const appRoutes: Routes = [
    { path: 'schedules', component: ScheduleListComponent},
    { path: 'usuario/:id/edit', component: UserEditComponent },
    { path: 'usuario/crear', component: UsuarioCrearComponent},
    { path: 'usuario', component: UserListComponent}, 
    { path: '', component: HomeComponent}
];


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)