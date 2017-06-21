"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var angular2_jwt_1 = require('angular2-jwt');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var interfaces_1 = require('../interfaces');
var items_service_1 = require('../utils/items.service');
var config_service_1 = require('../utils/config.service');
var data_service_1 = require('./data.service');
var EstadoService = (function (_super) {
    __extends(EstadoService, _super);
    function EstadoService(authHttp, itemsService, configService) {
        _super.call(this);
        this.authHttp = authHttp;
        this.itemsService = itemsService;
        this.configService = configService;
        this._uriEstado = 'Estado';
        this._baseUrl = configService.getApiURI();
    }
    EstadoService.prototype.getEstadoByStatus = function (includeMunicipios, statusRegistro) {
        return this.authHttp.get(this._baseUrl + this._uriEstado + '/list?incluirMunicipios=' + includeMunicipios + '&estatusRegistro=' + statusRegistro)
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    EstadoService.prototype.getEstados = function (page, itemsPerPage) {
        var paginatedResult = new interfaces_1.PaginatedResult();
        return this.authHttp.get(this._baseUrl + this._uriEstado + '/search/' + page + '/' + itemsPerPage)
            .map(function (res) {
            var data = res.json();
            paginatedResult.count = data.count;
            paginatedResult.page = data.page;
            paginatedResult.result = data.items;
            paginatedResult.totalCount = data.totalCount;
            paginatedResult.totalPages = data.totalPages;
            return paginatedResult;
        })
            .catch(this.handleError);
    };
    EstadoService.prototype.getEstadoDetails = function (id, incluirMunicipios) {
        return this.authHttp.get(this._baseUrl + this._uriEstado + '/' + id + '?incluirMunicipios=' + incluirMunicipios)
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    EstadoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp, items_service_1.ItemsService, config_service_1.ConfigService])
    ], EstadoService);
    return EstadoService;
}(data_service_1.DataService));
exports.EstadoService = EstadoService;
//# sourceMappingURL=estado.service.js.map