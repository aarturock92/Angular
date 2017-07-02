import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent} from './home/home.component'
import { ScheduleListComponent} from './schedules/schedule-list.component'

import { UserListComponent, UsuarioCrearComponent, UserEditComponent } from './users/index'
import { MovilListComponent, MovilEditComponent, MovilCreateComponent, MovilComponent  } from './movil/index'
import { PerfilUsuarioList } from './perfilUsuario/index'
import { VehiculoComponent, VehiculoListComponent } from './vehiculo/index'

const appRoutes: Routes = [
    { path: 'estado', component: ScheduleListComponent},
    { path: 'usuario/:id/edit', component: UserEditComponent },
    { path: 'usuario/crear', component: UsuarioCrearComponent},
    { path: 'usuario', component: UserListComponent}, 
    { path: 'movil/:id', component: MovilComponent },
    { path: 'movil/crear', component: MovilComponent },
    { path: 'movil', component: MovilListComponent},
    { path: 'perfilusuario', component: PerfilUsuarioList },
    { path: 'vehiculo', component: VehiculoListComponent },
    { path: 'vehiculo/:id/edit', component: VehiculoComponent },
    { path: 'vehiculo/create', component: VehiculoComponent },
    { path: '', component: HomeComponent}
];


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)