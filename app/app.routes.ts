import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent} from './home/home.component'
//import { UserListComponent} from './users/user-list.component'
import { ScheduleListComponent} from './schedules/schedule-list.component'
import { UserListComponent } from './users/user-list.component'
//import { ScheduleEditComponent} from './schedules/schedule-edit.component'

const appRoutes: Routes = [
    // { path: 'users', component: UserListComponent},
    { path: 'schedules', component: ScheduleListComponent},
    { path: 'usuarios', component: UserListComponent}, 
    // { path: 'schedules/:id/edit', component: ScheduleEditComponent},
    { path: '', component: HomeComponent}
];


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)