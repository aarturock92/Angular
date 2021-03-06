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
var RegionService = (function (_super) {
    __extends(RegionService, _super);
    function RegionService(authHttp, configService) {
        _super.call(this);
        this.authHttp = authHttp;
        this.configService = configService;
        this._uriRegion = 'Region';
        this._baseUrl = configService.getApiURI();
    }
    RegionService.prototype.getRegionesByEstatus = function (incluirPlazasImmex, estatusRegisto) {
        return this.authHttp.get(this._baseUrl + this._uriRegion + '/list?incluirPlazaImmex=' + incluirPlazasImmex + '&estatusRegistro=' + estatusRegisto)
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    RegionService.prototype.getRegionDetails = function (id, incluirPlazasImmex) {
        return this.authHttp.get(this._baseUrl + this._uriRegion + '/' + id + '?incluirPlazasImmex=' + incluirPlazasImmex)
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    RegionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp, index_1.ConfigService])
    ], RegionService);
    return RegionService;
}(data_service_1.DataService));
exports.RegionService = RegionService;
//# sourceMappingURL=region.service.js.map