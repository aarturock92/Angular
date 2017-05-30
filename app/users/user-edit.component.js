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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var usuario_service_1 = require('../shared/services/usuario.service');
var estado_service_1 = require('../shared/services/estado.service');
var items_service_1 = require('../shared/utils/items.service');
var notification_service_1 = require('../shared/utils/notification.service');
var UserEditComponent = (function () {
    function UserEditComponent(route, router, usuarioService, estadoService, itemsService, notificationService) {
        this.route = route;
        this.router = router;
        this.usuarioService = usuarioService;
        this.estadoService = estadoService;
        this.itemsService = itemsService;
        this.notificationService = notificationService;
        this.userLoaded = false;
    }
    UserEditComponent.prototype.ngOnInit = function () {
        this.loadEstadosByStatus();
        this.idUser = +this.route.snapshot.params['id'];
        this.loadUserDetails();
    };
    UserEditComponent.prototype.loadUserDetails = function () {
        var _this = this;
        this.usuarioService.getUsuarioDetails(this.idUser)
            .subscribe(function (user) {
            _this.user = _this.itemsService.getSerialized(user);
            _this.userLoaded = true;
        }, function (error) {
            _this.notificationService.printErrorMessage('Failed to load user' + error);
        });
    };
    UserEditComponent.prototype.loadEstadosByStatus = function () {
        var _this = this;
        this.estadoService.getEstadoByStatus(false, 1)
            .subscribe(function (res) {
            _this.estados = res;
        }, function (error) {
            _this.notificationService.printErrorMessage('Failed to load estados ' + error);
        });
    };
    UserEditComponent.prototype.back = function () {
        this.router.navigate(['/usuario']);
    };
    UserEditComponent.prototype.selectTab = function (tab_id) {
        this.staticTabs.tabs[tab_id].active = true;
    };
    UserEditComponent.prototype.disableEnable = function () {
        this.staticTabs.tabs[2].disabled = !this.staticTabs.tabs[2].disabled;
    };
    __decorate([
        core_1.ViewChild('staticTabs'), 
        __metadata('design:type', ng2_bootstrap_1.TabsetComponent)
    ], UserEditComponent.prototype, "staticTabs", void 0);
    UserEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-user-edit',
            templateUrl: 'user-edit.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, usuario_service_1.UsuarioService, estado_service_1.EstadoService, items_service_1.ItemsService, notification_service_1.NotificationService])
    ], UserEditComponent);
    return UserEditComponent;
}());
exports.UserEditComponent = UserEditComponent;
//# sourceMappingURL=user-edit.component.js.map