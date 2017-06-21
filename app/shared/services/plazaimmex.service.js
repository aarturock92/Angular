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
var PlazaImmexService = (function (_super) {
    __extends(PlazaImmexService, _super);
    function PlazaImmexService(authHttp, configService) {
        _super.call(this);
        this.authHttp = authHttp;
        this.configService = configService;
        this._uriPlazaImmex = 'PlazaImmex';
        this._baseUrl = this.configService.getApiURI();
    }
    PlazaImmexService.prototype.getPlazasImmexByEstatus = function (incluirPlazaOxxo, estatusRegistro) {
        return this.authHttp.get(this._baseUrl + this._uriPlazaImmex + '/list?incluirPlazasOxxo=' + incluirPlazaOxxo + '&estatusRegistro=' + estatusRegistro)
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    PlazaImmexService.prototype.getPlazaImmexDetails = function (id, incluirPlazaOxxo) {
        return this.authHttp.get(this._baseUrl + this._uriPlazaImmex + '/' + id + '?incluirPlazaOxxo=' + incluirPlazaOxxo)
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    PlazaImmexService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp, index_1.ConfigService])
    ], PlazaImmexService);
    return PlazaImmexService;
}(data_service_1.DataService));
exports.PlazaImmexService = PlazaImmexService;
//# sourceMappingURL=plazaimmex.service.js.map