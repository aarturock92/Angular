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
var angular2_jwt_1 = require('angular2-jwt');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var interfaces_1 = require('../interfaces');
var index_1 = require('../utils/index');
var data_service_1 = require('./data.service');
var UsuarioService = (function (_super) {
    __extends(UsuarioService, _super);
    function UsuarioService(http, configService, authentication, authHttp) {
        _super.call(this);
        this.http = http;
        this.configService = configService;
        this.authentication = authentication;
        this.authHttp = authHttp;
        this._uriUsuario = "Usuario";
        this._baseUrl = configService.getApiURI();
    }
    UsuarioService.prototype.getUsuarios = function (page, itemsPerPage) {
        var paginatedResult = new interfaces_1.PaginatedResult();
        return this.authHttp.get(this._baseUrl + this._uriUsuario + '/search/' + page + '/' + itemsPerPage)
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
    UsuarioService.prototype.getUsuarioDetails = function (id) {
        return this.http.get(this._baseUrl + this._uriUsuario + '/' + id, { headers: this.authentication.getHeaders() })
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    UsuarioService.prototype.createUsuario = function (usuario) {
        return this.http.post(this._baseUrl + this._uriUsuario + '/register', JSON.stringify(usuario), { headers: this.authentication.getHeaders() })
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    UsuarioService.prototype.deleteUser = function (idUser) {
        return this.http.delete(this._baseUrl + 'usuario/' + idUser, { headers: this.authentication.getHeaders() })
            .map(function (res) {
            return;
        })
            .catch(this.handleError);
    };
    UsuarioService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, index_1.ConfigService, index_1.AuthenticationService, angular2_jwt_1.AuthHttp])
    ], UsuarioService);
    return UsuarioService;
}(data_service_1.DataService));
exports.UsuarioService = UsuarioService;
//# sourceMappingURL=usuario.service.js.map