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
    function UsuarioCrearComponent(route, router, perfilUsuarioService, regionService, plazaImmexService, plazaOxxoService, estadoService, notificationService, itemsService) {
        this.route = route;
        this.router = router;
        this.perfilUsuarioService = perfilUsuarioService;
        this.regionService = regionService;
        this.plazaImmexService = plazaImmexService;
        this.plazaOxxoService = plazaOxxoService;
        this.estadoService = estadoService;
        this.notificationService = notificationService;
        this.itemsService = itemsService;
        this.user = {};
        this.loadedPerfilesUsuario = false;
        this.loadedMoviles = false;
        this.loadedPlazaOxxo = false;
        this.itemsRegiones = [];
        this.itemsPlazasImmex = [];
        this.itemsPlazasOxxo = [];
        this.itemsDistritos = [];
        this.itemsPerfilesUsuario = [];
        this.itemsEstados = [];
        this.itemsMunicipios = [];
        this.itemsMoviles = [];
        this.itemsVehiculos = [];
        this.showSpinner = false;
        //Variables Controles
        this.esControlMultiple = false;
        this.selectedAdministracion = false;
        this.selectedSupervision = false;
        this.selectedOperativo = false;
    }
    UsuarioCrearComponent.prototype.ngOnInit = function () {
        this.loadPerfilesUsuario();
        this.loadRegiones();
        this.loadEstados();
        this.showSpinner = false;
    };
    /**
    * Metodo que ejecuta el control Select al realizar el evento change.
    * @param idPerfilUsuario
    */
    UsuarioCrearComponent.prototype.onChangeSelectPerfilUsuario = function (idPerfilUsuario) {
        var perfilUsuario = this.itemsService.getItemFromArray(this.perfilUsuarios, function (p) { return p.id == idPerfilUsuario; });
        this.selectedAdministracion = false;
        this.selectedSupervision = false;
        this.selectedOperativo = false;
        this.esControlMultiple = perfilUsuario.asignacionMultiple;
        switch (perfilUsuario.jerarquiaId) {
            //Administración
            case 1:
                this.selectedAdministracion = true;
                break;
            //Supervisión
            case 2:
                this.selectedSupervision = true;
                break;
            //Operativo
            case 3:
                this.selectedOperativo = true;
                break;
        }
    };
    /**
     * Metodo que ejecuta el control de Región
     * @param idRegion
     */
    UsuarioCrearComponent.prototype.onChangeSelectRegion = function (idRegion) {
        var _this = this;
        this.showSpinner = true;
        this.regionService.getRegionDetails(idRegion, true)
            .subscribe(function (res) {
            _this.itemsPlazasImmex = [];
            _this.itemsPlazasOxxo = [];
            _this.itemsDistritos = [];
            if (res.plazasImmex.length > 0) {
                var plazasImmex = res.plazasImmex;
                for (var indexPlazaImmex = 0; indexPlazaImmex < plazasImmex.length; indexPlazaImmex++) {
                    _this.itemsPlazasImmex.push({
                        id: plazasImmex[indexPlazaImmex].id,
                        text: plazasImmex[indexPlazaImmex].nombrePlazaImmex
                    });
                }
            }
            else {
                _this.notificationService.printErrorMessage('No se encontraron Plazas Immex en esta Región');
            }
            _this.showSpinner = false;
        }, function (error) {
            _this.notificationService.printErrorMessage('Error al cargar las plazas Immex: ' + error);
        });
    };
    /**
     *
     * @param idPlazaImmex
     */
    UsuarioCrearComponent.prototype.onChangeSelectPlazaImmex = function (idPlazaImmex) {
        this.showSpinner = true;
        this.loadPlazasImmex(idPlazaImmex);
        this.loadMovilesByIdPlazaImmex(idPlazaImmex);
    };
    UsuarioCrearComponent.prototype.loadPlazasImmex = function (idPlazaImmex) {
        var _this = this;
        this.plazaImmexService.getPlazaImmexDetails(idPlazaImmex, true)
            .subscribe(function (res) {
            _this.itemsPlazasOxxo = [];
            _this.itemsDistritos = [];
            if (res.plazasOxxo.length > 0) {
                var plazasOxxo = res.plazasOxxo;
                for (var indexPlazaOxxo = 0; indexPlazaOxxo < plazasOxxo.length; indexPlazaOxxo++) {
                    _this.itemsPlazasOxxo.push({
                        id: plazasOxxo[indexPlazaOxxo].id,
                        text: plazasOxxo[indexPlazaOxxo].nombrePlazaOxxo
                    });
                }
            }
            else {
                _this.notificationService.printErrorMessage('No se encontraron Plazas Oxxo en esta Plaza Immex');
            }
            _this.showSpinner = false;
        }, function (error) {
            _this.notificationService.printErrorMessage('Error al cargar las Plazas Immex: ' + error);
        });
    };
    UsuarioCrearComponent.prototype.loadMovilesByIdPlazaImmex = function (idPlazaImmex) {
        var _this = this;
        this.plazaImmexService.getMovilesByIdPlazaImmex(idPlazaImmex, 1)
            .subscribe(function (res) {
            _this.itemsMoviles = [];
            if (res.length > 0) {
                for (var indexMovil = 0; indexMovil < res.length; indexMovil++) {
                    _this.itemsMoviles.push({
                        id: res[indexMovil].id,
                        text: res[indexMovil].numeroTelefono
                    });
                }
            }
            else {
                _this.notificationService.printErrorMessage('No se encontraron moviles en esta Plaza Immex');
            }
            _this.showSpinner = false;
        }, function (error) {
            _this.notificationService.printErrorMessage('Error al cargar Moviles');
        });
    };
    /**
     *
     * @param idPlazaOxxo
     */
    UsuarioCrearComponent.prototype.onChangeSelectPlazaOxxo = function (idPlazaOxxo) {
        var _this = this;
        this.showSpinner = true;
        this.plazaOxxoService.getPlazaOxxoDetails(idPlazaOxxo, true)
            .subscribe(function (res) {
            _this.itemsDistritos = [];
            if (res.distritos.length > 0) {
                var distritos = res.distritos;
                for (var indexDistrito = 0; indexDistrito < distritos.length; indexDistrito++) {
                    _this.itemsDistritos.push({
                        id: distritos[indexDistrito].id,
                        text: distritos[indexDistrito].nombreDistrito
                    });
                }
            }
            else {
                _this.notificationService.printErrorMessage('No se encontraron distritos en esta Plaza Oxxo');
            }
            _this.showSpinner = false;
        }, function (error) {
            _this.notificationService.printErrorMessage('Error al cargar los distritos: ' + error);
        });
    };
    /**
     * Metodo para cargar los perfiles de Usuario a partir de un servicio.
     */
    UsuarioCrearComponent.prototype.loadPerfilesUsuario = function () {
        var _this = this;
        this.perfilUsuarioService.getListPerfilesUsuario(1)
            .subscribe(function (res) {
            if (res.length > 0) {
                for (var indexPerfil = 0; indexPerfil < res.length; indexPerfil++) {
                    _this.itemsPerfilesUsuario.push({
                        id: res[indexPerfil].id,
                        text: res[indexPerfil].nombre
                    });
                }
                _this.perfilUsuarios = res;
            }
            else {
                _this.notificationService.printErrorMessage("No se encontraron perfiles de Usuario");
            }
            _this.loadedPerfilesUsuario = true;
        }, function (error) {
            _this.notificationService.printErrorMessage('Error al cargar los perfiles de Usuario: ' + error);
        });
    };
    /**
     * Metodo para cargar los Estados
     */
    UsuarioCrearComponent.prototype.loadEstados = function () {
        var _this = this;
        this.estadoService.getEstadoByStatus(false, 1)
            .subscribe(function (res) {
            _this.itemsEstados = [];
            if (res.length > 0) {
                for (var indexEstado = 0; indexEstado < res.length; indexEstado++) {
                    _this.itemsEstados.push({
                        id: res[indexEstado].id,
                        text: res[indexEstado].nombre
                    });
                }
            }
            else {
                _this.notificationService.printErrorMessage('No se encontraron estados');
            }
        }, function (error) {
            _this.notificationService.printErrorMessage('Error al cargar el Catalogo de Estados');
        });
    };
    /**
    * Metodo que carga los municipios a partir de un IdEstado
    */
    UsuarioCrearComponent.prototype.onChangeSelectEstado = function (idEstado) {
        var _this = this;
        this.showSpinner = true;
        this.estadoService.getEstadoDetails(idEstado, true)
            .subscribe(function (res) {
            _this.itemsMunicipios = [];
            if (res.municipios.length > 0) {
                var municipios = res.municipios;
                for (var indexMunicipio = 0; indexMunicipio < municipios.length; indexMunicipio++) {
                    _this.itemsMunicipios.push({
                        id: municipios[indexMunicipio].id,
                        text: municipios[indexMunicipio].nombre
                    });
                }
            }
            else {
                _this.notificationService.printErrorMessage('No se encontraron municipios');
            }
            _this.showSpinner = false;
        }, function (error) {
            _this.notificationService.printErrorMessage("Error al cargar el Catalogo de Municipios");
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
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, index_2.PerfilUsuarioService, index_2.RegionService, index_2.PlazaImmexService, index_2.PlazaOxxoService, index_2.EstadoService, index_1.NotificationService, index_1.ItemsService])
    ], UsuarioCrearComponent);
    return UsuarioCrearComponent;
}());
exports.UsuarioCrearComponent = UsuarioCrearComponent;
//# sourceMappingURL=usuario-create.component.js.map