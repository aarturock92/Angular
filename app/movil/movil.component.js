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
var MovilComponent = (function () {
    function MovilComponent(route, router, regionService, movilService, itemsService, notificationService) {
        this.route = route;
        this.router = router;
        this.regionService = regionService;
        this.movilService = movilService;
        this.itemsService = itemsService;
        this.notificationService = notificationService;
        this.itemsRegiones = [];
        this.itemsPlazasImmex = [];
        this.EstatusMovil = true;
        this.regionesLoaded = false;
        this.showSpinner = true;
        this.OnColor = 'success';
        this.OffColor = 'warning';
        this.OnText = 'Activo';
        this.OffText = 'Inactivo';
    }
    MovilComponent.prototype.ngOnInit = function () {
        this.loadRegiones();
        this.idMovil = +this.route.snapshot.params['id'];
        this.movil = {};
        if (!isNaN(this.idMovil)) {
            this.loadDetailsMovil();
            this.esEdicion = true;
        }
        else {
            this.showSpinner = false;
        }
    };
    /**
     *
     */
    MovilComponent.prototype.loadRegiones = function () {
        var _this = this;
        this.itemsRegiones = [];
        this.regionService.getRegionesByEstatus(false, 1)
            .subscribe(function (res) {
            if (res.length > 0) {
                for (var indexRegion = 0; indexRegion < res.length; indexRegion++) {
                    var region = res[indexRegion];
                    _this.itemsRegiones.push({
                        id: region.id,
                        text: region.nombreRegion
                    });
                }
            }
            else {
                _this.notificationService.printErrorMessage('No se encontraron regiones');
            }
            _this.regionesLoaded = true;
        }, function (error) {
            _this.notificationService.printErrorMessage("Error al cargar las Regiones " + error);
        });
    };
    MovilComponent.prototype.loadDetailsMovil = function () {
        var _this = this;
        this.movilService.getMovilDetails(this.idMovil)
            .subscribe(function (movil) {
            console.log('movil', movil);
            _this.movil = _this.itemsService.getSerialized(movil);
            _this.showSpinner = false;
        }, function (error) {
        });
    };
    MovilComponent.prototype.loadPlazasImmex = function (idRegion) {
    };
    /**
     * Evento para el botón regresar
     */
    MovilComponent.prototype.back = function () {
        this.router.navigate(['/movil']);
    };
    MovilComponent.prototype.onChangeSelectRegion = function (idRegion) {
        var _this = this;
        this.itemsPlazasImmex = [];
        this.regionService.getRegionDetails(idRegion, true)
            .subscribe(function (region) {
            if (region.plazasImmex.length > 0) {
                console.log("plazasImmex", region.plazasImmex);
                for (var indexPlaza = 0; indexPlaza < region.plazasImmex.length; indexPlaza++) {
                    var plaza = region.plazasImmex[indexPlaza];
                    _this.itemsPlazasImmex.push({
                        id: plaza.id,
                        text: plaza.nombrePlazaImmex
                    });
                }
                console.log("itemsPlazasImmex", _this.itemsPlazasImmex);
            }
            else {
                _this.notificationService.printErrorMessage('No se encontraron Plazas Immex para esta Región');
            }
        }, function (error) {
            _this.notificationService.printErrorMessage('Ocurrio un problema la cargar las Plazas Immex');
        });
    };
    MovilComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-movil',
            templateUrl: 'movil.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, index_1.RegionService, index_1.MovilService, index_2.ItemsService, index_2.NotificationService])
    ], MovilComponent);
    return MovilComponent;
}());
exports.MovilComponent = MovilComponent;
//# sourceMappingURL=movil.component.js.map