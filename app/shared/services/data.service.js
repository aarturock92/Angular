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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var interfaces_1 = require('../interfaces');
var items_service_1 = require('../utils/items.service');
var config_service_1 = require('../utils/config.service');
var DataService = (function () {
    function DataService(http, itemsService, configService) {
        this.http = http;
        this.itemsService = itemsService;
        this.configService = configService;
        this._baseUrl = '';
        this._baseUrl = configService.getApiURI();
    }
    DataService.prototype.getUsers = function () {
        return this.http.get(this._baseUrl + 'users')
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    DataService.prototype.getUserSchedules = function (id) {
        return this.http.get(this._baseUrl + 'users/' + id + 'schedules')
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    DataService.prototype.createUser = function (user) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this._baseUrl + 'users/', JSON.stringify(user), { headers: headers })
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    DataService.prototype.updateUser = function (user) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this._baseUrl + 'users/' + user.id, JSON.stringify(user), { headers: headers })
            .map(function (res) {
            return;
        })
            .catch(this.handleError);
    };
    DataService.prototype.deleteUser = function (id) {
        return this.http.delete(this._baseUrl + 'users/' + id)
            .map(function (res) {
            return;
        })
            .catch(this.handleError);
    };
    // getUsuarios():Observable<PaginatedResult<IUsuario[]>>{
    //     var paginatedResulta: PaginatedResult<IUsuario[]> = new PaginatedResult<IUsuario[]>();
    //     return this.http.get(this._baseUrl + 'usuarios')
    // }
    DataService.prototype.getEstadoDetails = function (id, incluirMunicipios) {
        return this.http.get(this._baseUrl + 'estados/' + id + '?incluirEstados=' + incluirMunicipios)
            .map(function (res) {
            debugger;
            return res.json();
        })
            .catch(this.handleError);
    };
    DataService.prototype.getEstados = function (page, itemsPerPage) {
        var paginatedResult = new interfaces_1.PaginatedResult();
        return this.http.get(this._baseUrl + 'estados/search/' + page + '/' + itemsPerPage)
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
    DataService.prototype.handleError = function (error) {
        var applicationError = error.headers.get('Application-Error');
        var serverError = error.json();
        var modelStateErrors = '';
        if (!serverError.type) {
            for (var key in serverError) {
                if (serverError[key])
                    modelStateErrors += '' + serverError[key] + '\n';
            }
        }
        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
        return Rx_1.Observable.throw(applicationError || modelStateErrors || 'Server error');
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, items_service_1.ItemsService, config_service_1.ConfigService])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map