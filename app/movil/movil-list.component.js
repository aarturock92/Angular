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
var index_1 = require('../shared/services/index');
var index_2 = require('../shared/utils/index');
var MovilListComponent = (function () {
    function MovilListComponent(movilService, itemsService, notificationService) {
        this.movilService = movilService;
        this.itemsService = itemsService;
        this.notificationService = notificationService;
        this.currentPage = 0;
        this.itemsPerPage = 10;
        this.totalItems = 0;
    }
    MovilListComponent.prototype.ngOnInit = function () {
        this.loadMoviles();
    };
    MovilListComponent.prototype.loadMoviles = function () {
        var _this = this;
        this.movilService.getMovilesPagination(this.currentPage, this.itemsPerPage)
            .subscribe(function (res) {
            _this.moviles = res.result;
            _this.totalItems = res.totalCount;
        }, function (error) {
            _this.notificationService.printErrorMessage('Fallo la carga de Moviles ' + error);
        });
    };
    MovilListComponent.prototype.pageChanged = function (event) {
        this.currentPage = event.page - 1;
        this.loadMoviles();
    };
    MovilListComponent.prototype.removeMovil = function (movil) {
        var _this = this;
        this.notificationService.openConfirmationDialog("¿Ésta seguro de eliminar el movil con el número de telefono: " + movil.numeroTelefono, function () {
            _this.movilService.deleteMovil(movil.id)
                .subscribe(function () {
                _this.itemsService.removeItemFromArray(_this.moviles, movil);
                _this.notificationService.printSuccessMessage('El movil con el número telefonico ' + movil.numeroTelefono + ' ha sido eliminado');
            }, function (error) {
                _this.notificationService.printErrorMessage('Ocurrio un error al eliminar el movil ' + error);
            });
        });
    };
    MovilListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-movil',
            templateUrl: 'movil-list.component.html',
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
        __metadata('design:paramtypes', [index_1.MovilService, index_2.ItemsService, index_2.NotificationService])
    ], MovilListComponent);
    return MovilListComponent;
}());
exports.MovilListComponent = MovilListComponent;
//# sourceMappingURL=movil-list.component.js.map