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
    function MovilComponent(route, router, regionService, movilService, itemsService, notificationService, mappingService) {
        this.route = route;
        this.router = router;
        this.regionService = regionService;
        this.movilService = movilService;
        this.itemsService = itemsService;
        this.notificationService = notificationService;
        this.mappingService = mappingService;
        this.idRegion = 0;
        this.idPlazaImmex = 0;
        this.activeIdRegion = {};
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
            _this.movil = _this.itemsService.getSerialized(movil);
            console.log('this.movil', _this.movil);
            _this.EstatusMovil = ((_this.movil.idEstatus === index_2.EstatusRegistro.Activo) ? true : false);
            //  this.idRegion = this.movil.regionId
            var region = _this.itemsService.getItemFromArray(_this.itemsRegiones, function (r) { return r.id == _this.movil.regionId; });
            console.log('region let', region);
            _this.activeIdRegion = { id: region.id,
                text: region.text };
            console.log('this.activeIdRegion', _this.activeIdRegion);
            //  this.idRegion = this.movil.regionId
            console.log('this.EstatusMovil', _this.EstatusMovil);
            _this.showSpinner = false;
        }, function (error) {
        });
    };
    /**
     * Evento para el botón regresar
     */
    MovilComponent.prototype.back = function () {
        this.router.navigate(['/movil']);
    };
    MovilComponent.prototype.onChangeSelectRegion = function (idRegion) {
        var _this = this;
        this.showSpinner = true;
        this.idRegion = idRegion;
        this.regionService.getRegionDetails(idRegion, true)
            .subscribe(function (region) {
            _this.itemsPlazasImmex = [];
            if (region.plazasImmex.length > 0) {
                for (var indexPlaza = 0; indexPlaza < region.plazasImmex.length; indexPlaza++) {
                    var plaza = region.plazasImmex[indexPlaza];
                    _this.itemsPlazasImmex.push({
                        id: plaza.id,
                        text: plaza.nombrePlazaImmex
                    });
                }
            }
            else {
                _this.notificationService.printErrorMessage('No se encontraron Plazas Immex para esta Región');
            }
            _this.showSpinner = false;
        }, function (error) {
            _this.notificationService.printErrorMessage('Ocurrio un problema la cargar las Plazas Immex');
            _this.showSpinner = false;
        });
    };
    MovilComponent.prototype.onChangeSelectPlazaImmex = function (idPlazaImmex) {
        this.idPlazaImmex = idPlazaImmex;
    };
    MovilComponent.prototype.crearMovil = function (formValues) {
        var _this = this;
        this.showSpinner = true;
        formValues.idEstatus = this.EstatusMovil;
        formValues.regionId = this.idRegion;
        formValues.plazaImmexId = this.idPlazaImmex;
        this.movilService.createMovil(this.mappingService.mapMovilCreate(formValues))
            .subscribe(function (movilCreado) {
            _this.showSpinner = false;
            _this.back();
        }, function (error) {
            _this.notificationService.printErrorMessage('No se pudo crear el movil: ' + error);
        });
    };
    MovilComponent.prototype.editarMovil = function (formValues) {
        var _this = this;
        this.showSpinner = true;
        this.movilService.updateMovil(this.idMovil, this.mappingService.mapMovilCreate(formValues))
            .subscribe(function (movilCreado) {
            _this.showSpinner = false;
            _this.back();
        }, function (error) {
            _this.showSpinner = false;
            _this.notificationService.printErrorMessage('No se pudo crear el movil: ' + error);
        });
    };
    MovilComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-movil',
            templateUrl: 'movil.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, index_1.RegionService, index_1.MovilService, index_2.ItemsService, index_2.NotificationService, index_2.MappingService])
    ], MovilComponent);
    return MovilComponent;
}());
exports.MovilComponent = MovilComponent;
//# sourceMappingURL=movil.component.js.map