"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./home/home.component');
var schedule_list_component_1 = require('./schedules/schedule-list.component');
var index_1 = require('./users/index');
var index_2 = require('./movil/index');
var appRoutes = [
    { path: 'estado', component: schedule_list_component_1.ScheduleListComponent },
    { path: 'usuario/:id/edit', component: index_1.UserEditComponent },
    { path: 'usuario/crear', component: index_1.UsuarioCrearComponent },
    { path: 'usuario', component: index_1.UserListComponent },
    { path: 'movil/:id/edit', component: index_2.MovilEditComponent },
    { path: 'movil/create', component: index_2.MovilCreateComponent },
    { path: 'movil', component: index_2.MovilListComponent },
    { path: '', component: home_component_1.HomeComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routes.js.map