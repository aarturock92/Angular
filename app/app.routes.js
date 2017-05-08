"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./home/home.component');
//import { UserListComponent} from './users/user-list.component'
var schedule_list_component_1 = require('./schedules/schedule-list.component');
//import { ScheduleEditComponent} from './schedules/schedule-edit.component'
var appRoutes = [
    // { path: 'users', component: UserListComponent},
    { path: 'schedules', component: schedule_list_component_1.ScheduleListComponent },
    // { path: 'schedules/:id/edit', component: ScheduleEditComponent},
    { path: '', component: home_component_1.HomeComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routes.js.map