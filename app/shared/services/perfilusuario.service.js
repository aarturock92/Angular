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
var index_1 = require('../utils/index');
var data_service_1 = require('./data.service');
var PerfilUsuarioService = (function (_super) {
    __extends(PerfilUsuarioService, _super);
    function PerfilUsuarioService(configService, authHttp) {
        _super.call(this);
        this.configService = configService;
        this.authHttp = authHttp;
        this._uriPerfilUsuario = 'PerfilUsuario';
        this._baseUrl = configService.getApiURI();
    }
    PerfilUsuarioService.prototype.getListPerfilesUsuario = function (statusRegistro) {
        return this.authHttp.get(this._baseUrl + this._uriPerfilUsuario + '/list?estatusRegistro=' + statusRegistro)
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    PerfilUsuarioService.prototype.getMenuByPerfilUsuarioId = function (idPerfilUsuario) {
        return this.authHttp.get(this._baseUrl + this._uriPerfilUsuario + '/' + idPerfilUsuario + '/Menu')
            .map(function (res) {
            console.log('respuesta', res.headers);
            var headers = res.headers;
            var Authorization = headers.get('Set-Authorization');
            console.log('Set-Authorization', Authorization);
            return res.json();
        })
            .catch(this.handleError);
    };
    PerfilUsuarioService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [index_1.ConfigService, angular2_jwt_1.AuthHttp])
    ], PerfilUsuarioService);
    return PerfilUsuarioService;
}(data_service_1.DataService));
exports.PerfilUsuarioService = PerfilUsuarioService;
//# sourceMappingURL=perfilusuario.service.js.map