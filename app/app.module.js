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
var http_2 = require('@angular/http');
var angular2_jwt_1 = require('angular2-jwt');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var jw_bootstrap_switch_ng2_1 = require('jw-bootstrap-switch-ng2');
var ng2_component_spinner_1 = require('ng2-component-spinner');
var ng2_select_1 = require('ng2-select');
var app_component_1 = require('./app.component');
var date_format_pipe_1 = require('./shared/pipes/date-format.pipe');
var highlight_directive_1 = require('./shared/directives/highlight.directive');
var home_component_1 = require('./home/home.component');
var mobile_hide_directive_1 = require('./shared/directives/mobile-hide.directive');
var schedule_list_component_1 = require('./schedules/schedule-list.component');
var index_1 = require('./users/index');
var index_2 = require('./movil/index');
var index_3 = require('./menu/index');
var app_routes_1 = require('./app.routes');
var index_4 = require('./shared/services/index');
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
                ng2_bootstrap_1.DatepickerModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                ng2_bootstrap_1.ModalModule.forRoot(),
                ng2_bootstrap_1.ProgressbarModule.forRoot(),
                ng2_bootstrap_1.PaginationModule.forRoot(),
                ng2_select_1.SelectModule,
                app_routes_1.routing,
                ng2_bootstrap_1.TimepickerModule.forRoot(),
                ng2_bootstrap_1.TabsModule.forRoot(),
                jw_bootstrap_switch_ng2_1.JWBootstrapSwitchModule,
                ng2_component_spinner_1.SpinnerComponentModule
            ],
            declarations: [
                app_component_1.AppComponent,
                date_format_pipe_1.DateFormatPipe,
                highlight_directive_1.HighlightDirective,
                home_component_1.HomeComponent,
                mobile_hide_directive_1.MobileHideDirective,
                schedule_list_component_1.ScheduleListComponent,
                index_1.UserListComponent,
                index_1.UsuarioCrearComponent,
                index_1.UserEditComponent,
                index_2.MovilListComponent,
                index_2.MovilEditComponent,
                index_2.MovilCreateComponent,
                index_3.MenuComponent
            ],
            providers: [
                config_service_1.ConfigService,
                index_4.PlazaOxxoService,
                index_4.PlazaImmexService,
                index_4.RegionService,
                index_4.EstadoService,
                index_4.UsuarioService,
                index_4.MovilService,
                index_4.PerfilUsuarioService,
                index_4.JerarquiaService,
                items_service_1.ItemsService,
                mapping_service_1.MappingService,
                notification_service_1.NotificationService,
                authentication_service_1.AuthenticationService,
                {
                    provide: angular2_jwt_1.AuthHttp,
                    useFactory: authHttpServiceFactory,
                    deps: [http_2.Http, http_2.RequestOptions]
                }
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
function authHttpServiceFactory(http, options) {
    return new angular2_jwt_1.AuthHttp(new angular2_jwt_1.AuthConfig({
        tokenName: 'token',
        tokenGetter: (function () { return sessionStorage.getItem('token'); }),
        globalHeaders: [{ 'Content-Type': 'application/json' }],
    }), http, options);
}
exports.authHttpServiceFactory = authHttpServiceFactory;
//# sourceMappingURL=app.module.js.map