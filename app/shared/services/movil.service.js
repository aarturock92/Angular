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
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var interfaces_1 = require('../interfaces');
var config_service_1 = require('../utils/config.service');
var authentication_service_1 = require('../utils/authentication.service');
var data_service_1 = require('./data.service');
var MovilService = (function (_super) {
    __extends(MovilService, _super);
    function MovilService(http, configService, authenticationService) {
        _super.call(this);
        this.http = http;
        this.configService = configService;
        this.authenticationService = authenticationService;
        this._uriMovil = "Movil";
        this._baseUrl = configService.getApiURI();
    }
    MovilService.prototype.getMovilesByEstatus = function (estatusRegistro) {
        return this.http.get(this._baseUrl + this._uriMovil + '/list?estatusRegistro=' + estatusRegistro, { headers: this.authenticationService.getHeaders() })
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    MovilService.prototype.getMovilesPagination = function (page, itemsPerPage) {
        var paginatedResult = new interfaces_1.PaginatedResult();
        return this.http.get(this._baseUrl + this._uriMovil + '/search/' + page + '/' + itemsPerPage, { headers: this.authenticationService.getHeaders() })
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
    MovilService.prototype.getMovilDetails = function (id) {
        return this.http.get(this._baseUrl + this._uriMovil + '/' + id, { headers: this.authenticationService.getHeaders() })
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    MovilService.prototype.createMovil = function (movil) {
        return this.http.post(this._baseUrl + this._uriMovil + '/register', JSON.stringify(movil), { headers: this.authenticationService.getHeaders() })
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    MovilService.prototype.deleteMovil = function (id) {
        return this.http.delete(this._baseUrl + this._uriMovil + '/' + id, { headers: this.authenticationService.getHeaders() })
            .map(function (res) {
            return;
        })
            .catch(this.handleError);
    };
    MovilService.prototype.updateMovil = function (id, movil) {
        console.log("movil modified", movil);
        return this.http.put(this._baseUrl + this._uriMovil + '/' + id, JSON.stringify(movil), { headers: this.authenticationService.getHeaders() })
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    MovilService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, config_service_1.ConfigService, authentication_service_1.AuthenticationService])
    ], MovilService);
    return MovilService;
}(data_service_1.DataService));
exports.MovilService = MovilService;
//# sourceMappingURL=movil.service.js.map