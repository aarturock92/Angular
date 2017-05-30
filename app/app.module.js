"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require('./rxjs-operators');
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var ng2_bootstrap_2 = require('ng2-bootstrap');
var ng2_bootstrap_3 = require('ng2-bootstrap');
var ng2_bootstrap_4 = require('ng2-bootstrap');
var ng2_bootstrap_5 = require('ng2-bootstrap');
var app_component_1 = require('./app.component');
var date_format_pipe_1 = require('./shared/pipes/date-format.pipe');
var highlight_directive_1 = require('./shared/directives/highlight.directive');
var home_component_1 = require('./home/home.component');
var mobile_hide_directive_1 = require('./shared/directives/mobile-hide.directive');
var schedule_list_component_1 = require('./schedules/schedule-list.component');
var user_list_component_1 = require('./users/user-list.component');
var usuario_crear_component_1 = require('./users/usuario-crear.component');
var user_edit_component_1 = require('./users/user-edit.component');
var app_routes_1 = require('./app.routes');
var estado_service_1 = require('./shared/services/estado.service');
var usuario_service_1 = require('./shared/services/usuario.service');
var config_service_1 = require('./shared/utils/config.service');
var items_service_1 = require('./shared/utils/items.service');
var mapping_service_1 = require('./shared/utils/mapping.service');
var notification_service_1 = require('./shared/utils/notification.service');
var authentication_service_1 = require('./shared/utils/authentication.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                ng2_bootstrap_2.DatepickerModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                ng2_bootstrap_3.ModalModule.forRoot(),
                ng2_bootstrap_4.ProgressbarModule.forRoot(),
                ng2_bootstrap_1.PaginationModule.forRoot(),
                app_routes_1.routing,
                ng2_bootstrap_5.TimepickerModule.forRoot()
            ],
            declarations: [
                app_component_1.AppComponent,
                date_format_pipe_1.DateFormatPipe,
                highlight_directive_1.HighlightDirective,
                home_component_1.HomeComponent,
                mobile_hide_directive_1.MobileHideDirective,
                schedule_list_component_1.ScheduleListComponent,
                user_list_component_1.UserListComponent,
                usuario_crear_component_1.UsuarioCrearComponent,
                user_edit_component_1.UserEditComponent
            ],
            providers: [
                config_service_1.ConfigService,
                estado_service_1.EstadoService,
                usuario_service_1.UsuarioService,
                items_service_1.ItemsService,
                mapping_service_1.MappingService,
                notification_service_1.NotificationService,
                authentication_service_1.AuthenticationService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map