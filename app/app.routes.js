"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./home/home.component');
var schedule_list_component_1 = require('./schedules/schedule-list.component');
var index_1 = require('./users/index');
var index_2 = require('./movil/index');
var index_3 = require('./perfilUsuario/index');
var index_4 = require('./vehiculo/index');
var appRoutes = [
    { path: 'estado', component: schedule_list_component_1.ScheduleListComponent },
    { path: 'usuario/:id/edit', component: index_1.UserEditComponent },
    { path: 'usuario/crear', component: index_1.UsuarioCrearComponent },
    { path: 'usuario', component: index_1.UserListComponent },
    { path: 'movil/:id/edit', component: index_2.MovilComponent },
    { path: 'movil/create', component: index_2.MovilComponent },
    { path: 'movil', component: index_2.MovilListComponent },
    { path: 'perfilusuario', component: index_3.PerfilUsuarioList },
    { path: 'vehiculo', component: index_4.VehiculoListComponent },
    { path: 'vehiculo/:id/edit', component: index_4.VehiculoComponent },
    { path: 'vehiculo/create', component: index_4.VehiculoComponent },
    { path: '', component: home_component_1.HomeComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routes.js.map