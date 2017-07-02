"use strict";
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var DataService = (function () {
    function DataService() {
    }
    DataService.prototype.handleError = function (error) {
        var applicationError = error.headers.get('Application-Error');
        var serverError = error.json();
        var modelStateErrors = '';
        if (!serverError.type) {
            console.log('serverError', serverError);
            for (var key in serverError) {
                if (serverError[key])
                    modelStateErrors += '' + serverError[key] + '\n';
            }
        }
        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
        return Rx_1.Observable.throw(applicationError || modelStateErrors || 'Server error');
    };
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map