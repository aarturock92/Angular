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
var movil_service_1 = require('../shared/services/movil.service');
var items_service_1 = require('../shared/utils/items.service');
var notification_service_1 = require('../shared/utils/notification.service');
var MovilEditComponent = (function () {
    function MovilEditComponent(route, router, itemsService, notificationService, movilService) {
        this.route = route;
        this.router = router;
        this.itemsService = itemsService;
        this.notificationService = notificationService;
        this.movilService = movilService;
        this.movilLoaded = false;
    }
    MovilEditComponent.prototype.ngOnInit = function () {
        this.idMovil = +this.route.snapshot.params['id'];
        console.log('this.idMovil', this.idMovil);
        this.loadMovilDetails();
    };
    MovilEditComponent.prototype.loadMovilDetails = function () {
        var _this = this;
        this.movilService.getMovilDetails(this.idMovil)
            .subscribe(function (movil) {
            _this.movil = _this.itemsService.getSerialized(movil);
            _this.movilLoaded = true;
            console.log('this.movil', _this.movil);
        }, function (error) {
            _this.notificationService.printErrorMessage('Failed to load movil ' + error);
        });
    };
    MovilEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-movil-edit',
            templateUrl: 'movil-edit.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, items_service_1.ItemsService, notification_service_1.NotificationService, movil_service_1.MovilService])
    ], MovilEditComponent);
    return MovilEditComponent;
}());
exports.MovilEditComponent = MovilEditComponent;
//# sourceMappingURL=movil-edit.component.js.map