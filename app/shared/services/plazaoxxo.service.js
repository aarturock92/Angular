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
var index_1 = require('../utils/index');
var data_service_1 = require('./data.service');
var angular2_jwt_1 = require('angular2-jwt');
var PlazaOxxoService = (function (_super) {
    __extends(PlazaOxxoService, _super);
    function PlazaOxxoService(authHttp, configService) {
        _super.call(this);
        this.authHttp = authHttp;
        this.configService = configService;
        this._uriPlazaOxxo = 'PlazaOxxo';
        this._baseUrl = this.configService.getApiURI();
    }
    PlazaOxxoService.prototype.getPlazaOxxoByEstatus = function (idEstatusRegistro, incluirDistritos) {
        return this.authHttp.get(this._baseUrl + this._uriPlazaOxxo + '/list?incluirDistritos' + incluirDistritos + '&estatusRegistro=' + idEstatusRegistro)
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    PlazaOxxoService.prototype.getPlazaOxxoDetails = function (idPlazaOxxo, incluirDistritos) {
        return this.authHttp.get(this._baseUrl + this._uriPlazaOxxo + '/' + idPlazaOxxo + '?incluirDistritos=' + incluirDistritos)
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    PlazaOxxoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp, index_1.ConfigService])
    ], PlazaOxxoService);
    return PlazaOxxoService;
}(data_service_1.DataService));
exports.PlazaOxxoService = PlazaOxxoService;
//# sourceMappingURL=plazaoxxo.service.js.map