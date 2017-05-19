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
var AuthenticationService = (function () {
    function AuthenticationService() {
        this.itemToken = 'Authorization';
        this.itemFullName = 'FullName';
    }
    AuthenticationService.prototype.getToken = function () {
        var token = 'Bearer ' + window.sessionStorage.getItem(this.itemToken);
        return token;
    };
    AuthenticationService.prototype.getFullName = function () {
        var fullName = window.sessionStorage.getItem(this.itemFullName);
        return fullName;
    };
    AuthenticationService.prototype.setToken = function (token) {
        window.sessionStorage.setItem(this.itemToken, token);
    };
    AuthenticationService.prototype.getHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append(this.itemToken, this.getToken());
        headers.append(this.itemFullName, this.getFullName());
        return headers;
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map