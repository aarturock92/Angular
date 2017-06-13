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
var index_1 = require('../shared/utils/index');
var index_2 = require('../shared/services/index');
var UsuarioCrearComponent = (function () {
    function UsuarioCrearComponent(route, router, perfilUsuarioService, regionService, notificationService, itemsService) {
        this.route = route;
        this.router = router;
        this.perfilUsuarioService = perfilUsuarioService;
        this.regionService = regionService;
        this.notificationService = notificationService;
        this.itemsService = itemsService;
        this.user = {};
        this.loadedPerfilesUsuario = false;
        this.itemsRegiones = [];
        //Variables Controles
        this.esControlMultipleRegion = false;
        this.selectedAdministracion = false;
    }
    UsuarioCrearComponent.prototype.ngOnInit = function () {
        this.loadPerfilesUsuario();
        this.loadRegiones();
    };
    UsuarioCrearComponent.prototype.onChangeSelectPerfilUsuario = function (idPerfilUsuario) {
        var perfilUsuario = this.itemsService.getItemFromArray(this.perfilUsuarios, function (p) { return p.id == idPerfilUsuario; });
        switch (perfilUsuario.jerarquiaId) {
            //Administración
            case 1:
                this.selectedAdministracion = true;
                if (perfilUsuario.asignacionMultiple)
                    this.esControlMultipleRegion = true;
                else
                    this.esControlMultipleRegion = false;
                break;
            //Supervisión
            case 2:
                this.selectedAdministracion = false;
                break;
            //Operativo
            case 3:
                this.selectedAdministracion = false;
                break;
        }
    };
    /**
     * Metodo para cargar los perfiles de Usuario a partir de un servicio.
     */
    UsuarioCrearComponent.prototype.loadPerfilesUsuario = function () {
        var _this = this;
        this.perfilUsuarioService.getListPerfilesUsuario(1)
            .subscribe(function (res) {
            _this.perfilUsuarios = res;
            _this.loadedPerfilesUsuario = true;
        }, function (error) {
            _this.notificationService.printErrorMessage('Error al cargar los perfiles de Usuario: ' + error);
        });
    };
    UsuarioCrearComponent.prototype.loadRegiones = function () {
        var _this = this;
        this.regionService.getRegionesByEstatus(false, 1)
            .subscribe(function (res) {
            for (var indexRegion = 0; indexRegion < res.length; indexRegion++) {
                _this.itemsRegiones.push({
                    id: res[indexRegion].id,
                    text: res[indexRegion].nombreRegion
                });
            }
        }, function (error) {
            _this.notificationService.printErrorMessage('Error al cargar las regiones ' + error);
        });
    };
    /**
     *
     * @param tab_id
     */
    UsuarioCrearComponent.prototype.selectTab = function (tab_id) {
        this.staticTabs.tabs[tab_id].active = true;
    };
    /**
     *
     */
    UsuarioCrearComponent.prototype.disableEnable = function () {
        this.staticTabs.tabs[2].disabled = !this.staticTabs.tabs[2].disabled;
    };
    /**
     * Metodo que se ejecuta al dar click en el botón atras.
     */
    UsuarioCrearComponent.prototype.back = function () {
        this.router.navigate(['/usuario']);
    };
    __decorate([
        core_1.ViewChild('staticTabs'), 
        __metadata('design:type', ng2_bootstrap_1.TabsetComponent)
    ], UsuarioCrearComponent.prototype, "staticTabs", void 0);
    UsuarioCrearComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-user-create',
            templateUrl: 'usuario-create.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, index_2.PerfilUsuarioService, index_2.RegionService, index_1.NotificationService, index_1.ItemsService])
    ], UsuarioCrearComponent);
    return UsuarioCrearComponent;
}());
exports.UsuarioCrearComponent = UsuarioCrearComponent;
//# sourceMappingURL=usuario-create.component.js.map