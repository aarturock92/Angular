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
var usuario_service_1 = require('../shared/services/usuario.service');
var items_service_1 = require('../shared/utils/items.service');
var notification_service_1 = require('../shared/utils/notification.service');
var config_service_1 = require('../shared/utils/config.service');
var UserListComponent = (function () {
    function UserListComponent(usuarioService, itemsService, notificationService, configService) {
        this.usuarioService = usuarioService;
        this.itemsService = itemsService;
        this.notificationService = notificationService;
        this.configService = configService;
        this.itemsPerPage = 10;
        this.totalItems = 0;
        this.currentPage = 0;
        this.selectedUsuarioLoaded = false;
    }
    UserListComponent.prototype.ngOnInit = function () {
        this.loadUsuarios();
    };
    UserListComponent.prototype.loadUsuarios = function () {
        var _this = this;
        this.usuarioService.getUsuarios(this.currentPage, this.itemsPerPage)
            .subscribe(function (res) {
            _this.usuarios = res.result;
            _this.totalItems = res.totalCount;
        }, function (error) {
            _this.notificationService.printErrorMessage('Fallo la carga de Usuarios' + error);
        });
    };
    UserListComponent.prototype.removeUsuario = function (usuario) {
        var _this = this;
        debugger;
        this.notificationService.openConfirmationDialog('Are yo sure you want to delete this user?', function () {
            _this.usuarioService.deleteUser(usuario.id)
                .subscribe(function () {
                _this.itemsService.removeItemFromArray(_this.usuarios, usuario);
                _this.notificationService.printSuccessMessage(usuario.nombreUsuario + ' has been deleted.');
            }, function (error) {
                _this.notificationService.printErrorMessage('Failed to delete ' + usuario + ' ' + error);
            });
        });
    };
    __decorate([
        core_1.ViewChild('modal'), 
        __metadata('design:type', Object)
    ], UserListComponent.prototype, "modal", void 0);
    UserListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-users',
            templateUrl: 'user-list.component.html',
            animations: [
                core_1.trigger('flyInOut', [
                    core_1.state('in', core_1.style({ opacity: 1, transform: 'translateX(0)' })),
                    core_1.transition('void => *', [
                        core_1.style({
                            opacity: 0,
                            transform: 'translateX(-100%)'
                        }),
                        core_1.animate('0.5s ease-in')
                    ]),
                    core_1.transition('* => void', [
                        core_1.animate('0.2s 10 ease-out', core_1.style({
                            opacity: 0,
                            transform: 'translateX(100%)'
                        }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [usuario_service_1.UsuarioService, items_service_1.ItemsService, notification_service_1.NotificationService, config_service_1.ConfigService])
    ], UserListComponent);
    return UserListComponent;
}());
exports.UserListComponent = UserListComponent;
//# sourceMappingURL=user-list.component.js.map