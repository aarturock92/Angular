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
var http_1 = require('@angular/http');
var config_service_1 = require('../utils/config.service');
var authentication_service_1 = require('../utils/authentication.service');
var data_service_1 = require('./data.service');
var PlazaImmexService = (function (_super) {
    __extends(PlazaImmexService, _super);
    function PlazaImmexService(http, configService, authenticationService) {
        _super.call(this);
        this.http = http;
        this.configService = configService;
        this.authenticationService = authenticationService;
        this._uriPlazaImmex = 'PlazaImmex';
        this._baseUrl = this.configService.getApiURI();
    }
    PlazaImmexService.prototype.getPlazasImmexByEstatus = function (incluirPlazaOxxo, estatusRegistro) {
        return this.http.get(this._baseUrl + this._uriPlazaImmex + '/list?incluirPlazasOxxo=' + incluirPlazaOxxo + '&estatusRegistro=' + estatusRegistro, { headers: this.authenticationService.getHeaders() })
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    PlazaImmexService.prototype.getPlazaImmexDetails = function (id, incluirPlazaOxxo) {
        return this.http.get(this._baseUrl + this._uriPlazaImmex + '/' + id + '?incluirPlazaOxxo=' + incluirPlazaOxxo, { headers: this.authenticationService.getHeaders() })
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    PlazaImmexService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, config_service_1.ConfigService, authentication_service_1.AuthenticationService])
    ], PlazaImmexService);
    return PlazaImmexService;
}(data_service_1.DataService));
exports.PlazaImmexService = PlazaImmexService;
//# sourceMappingURL=plazaimmex.service.js.map