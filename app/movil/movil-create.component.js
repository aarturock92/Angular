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
var MovilCreateComponent = (function () {
    function MovilCreateComponent(route, router, movilService, regionService, notificationService, mappingService) {
        this.route = route;
        this.router = router;
        this.movilService = movilService;
        this.regionService = regionService;
        this.notificationService = notificationService;
        this.mappingService = mappingService;
        this.movil = {};
        this.OnColor = 'success';
        this.OffColor = 'warning';
        this.OnText = 'Activo';
        this.OffText = 'Inactivo';
        this.EstatusMovil = true;
        this.regionesLoaded = false;
    }
    MovilCreateComponent.prototype.ngOnInit = function () {
        this.loadRegiones();
    };
    MovilCreateComponent.prototype.loadRegiones = function () {
        var _this = this;
        this.regionService.getRegionesByEstatus(false, 1)
            .subscribe(function (res) {
            _this.regiones = res;
            _this.regionesLoaded = true;
        }, function (error) {
            _this.notificationService.printErrorMessage("Error al cargar las Regiones " + error);
        });
    };
    MovilCreateComponent.prototype.onChangeSelectRegion = function (idRegion) {
        var _this = this;
        this.regionService.getRegionDetails(idRegion, true)
            .subscribe(function (res) {
            _this.plazasImmex = res.plazasImmex;
        }, function (error) {
            _this.notificationService.printErrorMessage("Error al cargar las Plazas Immex " + error);
        });
    };
    MovilCreateComponent.prototype.saveMovil = function (formValues) {
        var _this = this;
        formValues.idEstatus = (this.EstatusMovil) ? 1 : 2;
        console.log("formValues", formValues);
        this.movilService.createMovil(this.mappingService.mapMovilCreate(formValues))
            .subscribe(function (movilCreado) {
            console.log("movilCreated", movilCreado);
        }, function (error) {
            _this.notificationService.printErrorMessage('No se pudo crear el movil: ' + error);
        });
    };
    MovilCreateComponent.prototype.back = function () {
        this.router.navigate(['/movil']);
    };
    MovilCreateComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-movil-create',
            templateUrl: 'movil-create.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, index_1.MovilService, index_1.RegionService, index_2.NotificationService, index_2.MappingService])
    ], MovilCreateComponent);
    return MovilCreateComponent;
}());
exports.MovilCreateComponent = MovilCreateComponent;
//# sourceMappingURL=movil-create.component.js.map