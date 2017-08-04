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
var forms_1 = require('@angular/forms');
var index_1 = require('../shared/services/index');
var index_2 = require('../shared/utils/index');
var MovilComponent = (function () {
    function MovilComponent(route, router, regionService, movilService, itemsService, notificationService, mappingService, formBuilder) {
        this.route = route;
        this.router = router;
        this.regionService = regionService;
        this.movilService = movilService;
        this.itemsService = itemsService;
        this.notificationService = notificationService;
        this.mappingService = mappingService;
        this.formBuilder = formBuilder;
        this.regionId = 0;
        this.plazaImmexId = 0;
        this.activeIdRegion = {};
        // public itemsRegiones: Array<Select2OptionData>;
        // public itemsPlazasImmex: Array<Select2OptionData>;
        this.seCompletoOperacion = false;
        this.EstatusMovil = true;
        this.regionesLoaded = false;
        this.showSpinner = true;
        this.OnColor = 'success';
        this.OffColor = 'warning';
        this.OnText = 'Activo';
        this.OffText = 'Inactivo';
    }
    MovilComponent.prototype.ngOnInit = function () {
        this.loadRegiones();
        this.idMovil = +this.route.snapshot.params['id'];
        this.movil = {};
        if (!isNaN(this.idMovil)) {
            this.loadDetailsMovil();
            this.esEdicion = true;
        }
        else {
            this.showSpinner = false;
        }
        // this.adapter = (region: IRegion) => {
        //     return {
        //         id: String(region.id),
        //         text: region.nombreRegion,
        //         entity: region
        //     };
        // }
        this.form = this.formBuilder.group({
            region: null
        });
    };
    /**
     *
     */
    MovilComponent.prototype.loadRegiones = function () {
        // this.listaRegiones = (term: string) => this.regionService.getRegionesByEstatus(false, 1);
        // this.regionService.getRegionesByEstatus(false, 1)
        //     .subscribe((res: IRegion[]) => {                
        //         this.listaRegiones = [];
        //         if(res.length > 0){
        //             this.listaRegiones =
        //             this.itemsRegiones.push({
        //                 id: '0',
        //                 text: '-- Seleccione Región--'
        //             });
        //             for(let indexRegion = 0; indexRegion < res.length; indexRegion++){
        //                 let region = res[indexRegion];
        //                 this.itemsRegiones.push({
        //                     id: String(region.id),
        //                     text: String(region.nombreRegion)
        //                 })
        //             }
        //         }else{
        //             this.notificationService.printErrorMessage('No se encontraron regiones')
        //         }
        //         this.regionesLoaded = true
        //     },
        //     error => {
        //         this.notificationService.printErrorMessage("Error al cargar las Regiones " + error)
        //     })           
    };
    MovilComponent.prototype.loadDetailsMovil = function () {
        var _this = this;
        this.movilService.getMovilDetails(this.idMovil)
            .subscribe(function (movil) {
            _this.movil = _this.itemsService.getSerialized(movil);
            _this.EstatusMovil = ((_this.movil.idEstatus === index_2.EstatusRegistro.Activo) ? true : false);
            _this.regionId = _this.movil.regionId;
            _this.plazaImmexId = _this.movil.plazaImmexId;
            _this.showSpinner = false;
        }, function (error) {
            _this.notificationService.printErrorMessage('Ocurrio un error al cargar el registro' + error);
        });
    };
    /**
     * Evento para el botón regresar
     */
    MovilComponent.prototype.back = function (mensaje) {
        if (mensaje === void 0) { mensaje = ''; }
        if (this.seCompletoOperacion)
            this.router.navigate(['/movil', { mensaje: mensaje }]);
        else
            this.router.navigate(['/movil']);
    };
    /**
     *
     * @param regionId Representa el valor seleccionado en el campo Región.
     */
    MovilComponent.prototype.onChangeSelectRegion = function (regionId) {
        this.regionId = regionId;
        // if(regionId != 0){
        //     this.showSpinner = true           
        //     this.regionService.getRegionDetails(regionId, true)
        //         .subscribe((region: IRegion)=> {
        //             this.itemsPlazasImmex = []
        //             if(region.plazasImmex.length > 0){
        //                 this.itemsPlazasImmex.push({
        //                     id: '0',
        //                     text: '-- Seleccione Plaza Immex --'
        //                 });
        //                 for(let indexPlaza= 0; indexPlaza < region.plazasImmex.length; indexPlaza++){
        //                     let plaza = region.plazasImmex[indexPlaza]
        //                     this.itemsPlazasImmex.push({
        //                         id: String(plaza.id),
        //                         text: String(plaza.nombrePlazaImmex)
        //                     })
        //                 }
        //        }else{
        //             this.notificationService.printErrorMessage('No se encontraron Plazas Immex para esta Región')
        //         } 
        //         this.showSpinner= false      
        //      }, 
        //      error => {
        //         this.notificationService.printErrorMessage('Ocurrio un problema la cargar las Plazas Immex')
        //         this.showSpinner= false
        //      })                
        // }else{
        //     this.itemsPlazasImmex = [];
        // }        
    };
    MovilComponent.prototype.onChangeSelectPlazaImmex = function (plazaImmexId) {
        this.plazaImmexId = plazaImmexId;
    };
    MovilComponent.prototype.crearMovil = function (formValues) {
        var _this = this;
        this.showSpinner = true;
        formValues.idEstatus = this.EstatusMovil;
        formValues.regionId = this.regionId;
        formValues.plazaImmexId = this.plazaImmexId;
        this.movilService.createMovil(this.mappingService.mapMovilCreate(formValues))
            .subscribe(function (movilCreado) {
            _this.showSpinner = false;
            _this.back('Movil creado correctamente');
        }, function (error) {
            _this.notificationService.printErrorMessage('No se pudo crear el movil: ' + error);
        });
    };
    MovilComponent.prototype.editarMovil = function (formValues) {
        var _this = this;
        this.showSpinner = true;
        formValues.idEstatus = this.EstatusMovil;
        formValues.regionId = this.regionId;
        formValues.plazaImmexId = this.plazaImmexId;
        this.movilService.updateMovil(this.idMovil, this.mappingService.mapMovilCreate(formValues))
            .subscribe(function (movilCreado) {
            _this.showSpinner = false;
            _this.seCompletoOperacion = true;
            _this.back('Movil actualizado correctamente');
        }, function (error) {
            _this.showSpinner = false;
            _this.notificationService.printErrorMessage('No se pudo crear el movil: ' + error);
        });
    };
    MovilComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-movil',
            templateUrl: 'movil.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, index_1.RegionService, index_1.MovilService, index_2.ItemsService, index_2.NotificationService, index_2.MappingService, forms_1.FormBuilder])
    ], MovilComponent);
    return MovilComponent;
}());
exports.MovilComponent = MovilComponent;
//# sourceMappingURL=movil.component.js.map