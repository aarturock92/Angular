"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./home/home.component');
var schedule_list_component_1 = require('./schedules/schedule-list.component');
var user_list_component_1 = require('./users/user-list.component');
var usuario_create_component_1 = require('./users/usuario-create.component');
var user_edit_component_1 = require('./users/user-edit.component');
var movil_list_component_1 = require('./movil/movil-list.component');
var appRoutes = [
    { path: 'schedules', component: schedule_list_component_1.ScheduleListComponent },
    { path: 'usuario/:id/edit', component: user_edit_component_1.UserEditComponent },
    { path: 'usuario/crear', component: usuario_create_component_1.UsuarioCrearComponent },
    { path: 'usuario', component: user_list_component_1.UserListComponent },
    { path: 'movil/:id/edit', component: MovilEditComponent },
    { path: 'movil', component: movil_list_component_1.MovilListComponent },
    { path: '', component: home_component_1.HomeComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routes.js.map