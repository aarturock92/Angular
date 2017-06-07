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
var MovilCreateComponent = (function () {
    function MovilCreateComponent(route, router) {
        this.route = route;
        this.router = router;
    }
    MovilCreateComponent.prototype.ngOnInit = function () {
    };
    MovilCreateComponent.prototype.back = function () {
        this.router.navigate(['/movil']);
    };
    MovilCreateComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-movil-create',
            templateUrl: 'movil-create.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router])
    ], MovilCreateComponent);
    return MovilCreateComponent;
}());
exports.MovilCreateComponent = MovilCreateComponent;
//# sourceMappingURL=movil-create.component.js.map