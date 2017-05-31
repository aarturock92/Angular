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
var router_1 = require('@angular/router');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var UsuarioCrearComponent = (function () {
    function UsuarioCrearComponent(route, router) {
        this.route = route;
        this.router = router;
    }
    UsuarioCrearComponent.prototype.ngOnInit = function () {
    };
    UsuarioCrearComponent.prototype.selectTab = function (tab_id) {
        this.staticTabs.tabs[tab_id].active = true;
    };
    UsuarioCrearComponent.prototype.disableEnable = function () {
        this.staticTabs.tabs[2].disabled = !this.staticTabs.tabs[2].disabled;
    };
    UsuarioCrearComponent.prototype.back = function () {
        this.router.navigate(['/usuario']);
    };
    __decorate([
        core_1.ViewChild('staticTabs'), 
        __metadata('design:type', ng2_bootstrap_1.TabsetComponent)
    ], UsuarioCrearComponent.prototype, "staticTabs", void 0);
    UsuarioCrearComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-user-create',
            templateUrl: 'usuario-create.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router])
    ], UsuarioCrearComponent);
    return UsuarioCrearComponent;
}());
exports.UsuarioCrearComponent = UsuarioCrearComponent;
//# sourceMappingURL=usuario-create.component.js.map