import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent} from './home/home.component'
import { ScheduleListComponent} from './schedules/schedule-list.component'

import { UserListComponent, UsuarioCrearComponent, UserEditComponent } from './users/index'
import { MovilListComponent, MovilEditComponent, MovilCreateComponent  } from './movil/index'

const appRoutes: Routes = [
    { path: 'estado', component: ScheduleListComponent},
    { path: 'usuario/:id/edit', component: UserEditComponent },
    { path: 'usuario/crear', component: UsuarioCrearComponent},
    { path: 'usuario', component: UserListComponent}, 
    { path: 'movil/:id/edit', component: MovilEditComponent },
    { path: 'movil/create', component: MovilCreateComponent },
    { path: 'movil', component: MovilListComponent},
    { path: '', component: HomeComponent}
];


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)