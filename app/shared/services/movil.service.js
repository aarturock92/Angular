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
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var interfaces_1 = require('../interfaces');
var index_1 = require('../utils/index');
var data_service_1 = require('./data.service');
var MovilService = (function (_super) {
    __extends(MovilService, _super);
    function MovilService(authHttp, configService) {
        _super.call(this);
        this.authHttp = authHttp;
        this.configService = configService;
        this._uriMovil = "Movil";
        this._baseUrl = configService.getApiURI();
    }
    MovilService.prototype.getMovilesByEstatus = function (estatusRegistro) {
        return this.authHttp.get(this._baseUrl + this._uriMovil + '?estatusRegistro=' + estatusRegistro)
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    MovilService.prototype.getMovilesPagination = function (page, itemsPerPage) {
        var paginatedResult = new interfaces_1.PaginatedResult();
        return this.authHttp.get(this._baseUrl + this._uriMovil + '/search/' + page + '/' + itemsPerPage)
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
        return this.authHttp.get(this._baseUrl + this._uriMovil + '/' + id)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) {
            switch (parseInt(error.status)) {
                case index_1.ETypeStatusCode.NOTFOUND:
                    break;
                case index_1.ETypeStatusCode.INTERNALSERVERERROR:
                    break;
                default:
                    break;
            }
            return Rx_1.Observable.throw('Server error');
        });
    };
    MovilService.prototype.createMovil = function (movil) {
        return this.authHttp.post(this._baseUrl + this._uriMovil, JSON.stringify(movil))
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) {
            var serverError = error.json();
            var modelStateErrors = '';
            var applicationError = '';
            switch (error.status) {
                //El formato para los datos no es el correcto.
                case index_1.ETypeStatusCode.BADREQUEST:
                    if (!serverError.type) {
                        for (var key in serverError) {
                            if (serverError[key])
                                modelStateErrors += '' + serverError[key] + '\n';
                        }
                    }
                    break;
                //Ya existe una entidad movil con el IMEI, Numero de Serie o
                //Número de Telefono.
                case index_1.ETypeStatusCode.CONFLICT:
                    break;
                //Ocurrio un error al realizar la trasacción.
                case index_1.ETypeStatusCode.INTERNALSERVERERROR:
                    break;
                //Error desconocido.                   
                default:
                    break;
            }
            return Rx_1.Observable.throw(modelStateErrors || applicationError);
        });
    };
    MovilService.prototype.deleteMovil = function (id) {
        return this.authHttp.delete(this._baseUrl + this._uriMovil + '/' + id)
            .map(function (res) {
            return;
        })
            .catch(this.handleError);
    };
    MovilService.prototype.updateMovil = function (id, movil) {
        return this.authHttp.put(this._baseUrl + this._uriMovil + '/' + id, JSON.stringify(movil))
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    MovilService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp, index_1.ConfigService])
    ], MovilService);
    return MovilService;
}(data_service_1.DataService));
exports.MovilService = MovilService;
//# sourceMappingURL=movil.service.js.map