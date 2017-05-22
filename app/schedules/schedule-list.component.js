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
var ng2_bootstrap_1 = require('ng2-bootstrap');
var estado_service_1 = require('../shared/services/estado.service');
var items_service_1 = require('../shared/utils/items.service');
var notification_service_1 = require('../shared/utils/notification.service');
var config_service_1 = require('../shared/utils/config.service');
var ScheduleListComponent = (function () {
    function ScheduleListComponent(estadoService, itemsService, notificationService, configService) {
        this.estadoService = estadoService;
        this.itemsService = itemsService;
        this.notificationService = notificationService;
        this.configService = configService;
        this.itemsPerPage = 10;
        this.totalItems = 0;
        this.currentPage = 0;
        this.selectedEstadoLoaded = false;
    }
    ScheduleListComponent.prototype.ngOnInit = function () {
        this.loadEstados();
    };
    ScheduleListComponent.prototype.loadEstados = function () {
        var _this = this;
        this.estadoService.getEstados(this.currentPage, this.itemsPerPage)
            .subscribe(function (res) {
            _this.estados = res.result;
            _this.totalItems = res.totalCount;
        }, function (error) {
            _this.notificationService.printErrorMessage('Fallo la carga de Estados ' + error);
        });
    };
    ScheduleListComponent.prototype.pageChanged = function (event) {
        this.currentPage = event.page - 1;
        this.loadEstados();
    };
    ScheduleListComponent.prototype.viewEstadoDetails = function (id) {
        var _this = this;
        this.selectedEstadoId = id;
        this.estadoService.getEstadoDetails(this.selectedEstadoId, true)
            .subscribe(function (estado) {
            _this.estadoDetails = _this.itemsService.getSerialized(estado);
            _this.selectedEstadoLoaded = true;
            _this.childModal.show();
        }, function (error) {
            _this.notificationService.printErrorMessage('Failed to load schedule. ' + error);
        });
    };
    ScheduleListComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    __decorate([
        core_1.ViewChild('childModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], ScheduleListComponent.prototype, "childModal", void 0);
    __decorate([
        core_1.ViewChild('modal'), 
        __metadata('design:type', Object)
    ], ScheduleListComponent.prototype, "modal", void 0);
    ScheduleListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-schedules',
            templateUrl: 'schedule-list.component.html',
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
        __metadata('design:paramtypes', [estado_service_1.EstadoService, items_service_1.ItemsService, notification_service_1.NotificationService, config_service_1.ConfigService])
    ], ScheduleListComponent);
    return ScheduleListComponent;
}());
exports.ScheduleListComponent = ScheduleListComponent;
//# sourceMappingURL=schedule-list.component.js.map