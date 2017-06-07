import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent} from './home/home.component'
import { ScheduleListComponent} from './schedules/schedule-list.component'

import { UserListComponent } from './users/user-list.component'
import { UsuarioCrearComponent } from './users/usuario-create.component'
import { UserEditComponent } from './users/user-edit.component'

import { MovilListComponent } from './movil/movil-list.component'
import { MovilEditComponent } from './movil/movil-edit.component'
import { MovilCreateComponent } from './movil/movil-create.component' 

const appRoutes: Routes = [
    { path: 'schedules', component: ScheduleListComponent},
    { path: 'usuario/:id/edit', component: UserEditComponent },
    { path: 'usuario/crear', component: UsuarioCrearComponent},
    { path: 'usuario', component: UserListComponent}, 
    { path: 'movil/:id/edit', component: MovilEditComponent },
    { path: 'movil/create', component: MovilCreateComponent },
    { path: 'movil', component: MovilListComponent},
    { path: '', component: HomeComponent}
];


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)