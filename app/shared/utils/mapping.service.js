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
var items_service_1 = require('./items.service');
var MappingService = (function () {
    function MappingService(itemsService) {
        this.itemsService = itemsService;
    }
    MappingService.prototype.mapMovilCreate = function (formValues) {
        var movil = {
            id: 0,
            regionId: parseInt(formValues.regionId),
            plazaImmexId: parseInt(formValues.plazaImmexId),
            marca: formValues.marca,
            modelo: formValues.modelo,
            numeroTelefono: formValues.numeroTelefono,
            numeroSerie: formValues.numeroSerie,
            imei: formValues.imei,
            idEstatus: ((formValues.idEstatus) ? EstatusRegistro.Activo : EstatusRegistro.Inactivo)
        };
        return movil;
    };
    MappingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [items_service_1.ItemsService])
    ], MappingService);
    return MappingService;
}());
exports.MappingService = MappingService;
(function (EstatusRegistro) {
    EstatusRegistro[EstatusRegistro["Activo"] = 1] = "Activo";
    EstatusRegistro[EstatusRegistro["Inactivo"] = 2] = "Inactivo";
})(exports.EstatusRegistro || (exports.EstatusRegistro = {}));
var EstatusRegistro = exports.EstatusRegistro;
//# sourceMappingURL=mapping.service.js.map