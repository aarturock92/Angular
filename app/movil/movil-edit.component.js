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
var index_1 = require('../shared/services/index');
var index_2 = require('../shared/utils/index');
var MovilEditComponent = (function () {
    function MovilEditComponent(route, router, itemsService, notificationService, mappingService, movilService, regionService) {
        this.route = route;
        this.router = router;
        this.itemsService = itemsService;
        this.notificationService = notificationService;
        this.mappingService = mappingService;
        this.movilService = movilService;
        this.regionService = regionService;
        this.movilLoaded = false;
        this.regionesLoaded = false;
        this.plazasImmexLoaded = false;
        this.OnColor = 'success';
        this.OffColor = 'warning';
        this.OnText = 'Activo';
        this.OffText = 'Inactivo';
        this.EstatusMovil = false;
    }
    MovilEditComponent.prototype.ngOnInit = function () {
        this.idMovil = +this.route.snapshot.params['id'];
        this.loadRegiones();
        this.loadMovilDetails();
    };
    MovilEditComponent.prototype.loadMovilDetails = function () {
        var _this = this;
        this.movilService.getMovilDetails(this.idMovil)
            .subscribe(function (movil) {
            _this.movil = _this.itemsService.getSerialized(movil);
            _this.movilLoaded = true;
            _this.loadControlEstatus(_this.movil.idEstatus);
            _this.onChangeSelectRegion(_this.movil.idRegion);
        }, function (error) {
            _this.notificationService.printErrorMessage('Failed to load movil ' + error);
        });
    };
    MovilEditComponent.prototype.loadRegiones = function () {
        var _this = this;
        this.regionService.getRegionesByEstatus(false, 1)
            .subscribe(function (res) {
            _this.regiones = res;
            _this.regionesLoaded = true;
        }, function (error) {
            _this.notificationService.printErrorMessage("Error al cargar las Regiones " + error);
        });
    };
    MovilEditComponent.prototype.onChangeSelectRegion = function (idRegion) {
        var _this = this;
        this.regionService.getRegionDetails(idRegion, true)
            .subscribe(function (res) {
            _this.plazasImmex = res.plazasImmex;
            _this.plazasImmexLoaded = true;
        }, function (error) {
            _this.notificationService.printErrorMessage("Error al cargar las Plazas Immex " + error);
        });
    };
    MovilEditComponent.prototype.loadControlEstatus = function (idEstatus) {
        switch (idEstatus) {
            case 1:
                this.EstatusMovil = true;
                break;
            case 2:
                this.EstatusMovil = false;
                break;
        }
    };
    MovilEditComponent.prototype.back = function () {
        this.router.navigate(['/movil']);
    };
    MovilEditComponent.prototype.saveMovil = function (formValues) {
        var _this = this;
        formValues.idEstatus = (this.EstatusMovil) ? 1 : 2;
        this.movilService.updateMovil(this.idMovil, this.mappingService.mapMovilCreate(formValues))
            .subscribe(function (movilCreado) {
            _this.back();
        }, function (error) {
            _this.notificationService.printErrorMessage('No se pudo crear el movil: ' + error);
        });
    };
    MovilEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-movil-edit',
            templateUrl: 'movil-edit.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, index_2.ItemsService, index_2.NotificationService, index_2.MappingService, index_1.MovilService, index_1.RegionService])
    ], MovilEditComponent);
    return MovilEditComponent;
}());
exports.MovilEditComponent = MovilEditComponent;
//# sourceMappingURL=movil-edit.component.js.map