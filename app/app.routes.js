"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./home/home.component');
var schedule_list_component_1 = require('./schedules/schedule-list.component');
var user_list_component_1 = require('./users/user-list.component');
var usuario_crear_component_1 = require('./users/usuario-crear.component');
var appRoutes = [
    { path: 'schedules', component: schedule_list_component_1.ScheduleListComponent },
    { path: 'usuario/crear', component: usuario_crear_component_1.UsuarioCrearComponent },
    { path: 'usuario', component: user_list_component_1.UserListComponent },
    { path: '', component: home_component_1.HomeComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routes.js.map