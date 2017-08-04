"use strict";
(function (ETypeEstatusRegistro) {
    ETypeEstatusRegistro[ETypeEstatusRegistro["ACTIVO"] = 1] = "ACTIVO";
    ETypeEstatusRegistro[ETypeEstatusRegistro["INACTIVO"] = 2] = "INACTIVO";
    ETypeEstatusRegistro[ETypeEstatusRegistro["ELIMINADO"] = 3] = "ELIMINADO";
    ETypeEstatusRegistro[ETypeEstatusRegistro["TODOS"] = 0] = "TODOS";
})(exports.ETypeEstatusRegistro || (exports.ETypeEstatusRegistro = {}));
var ETypeEstatusRegistro = exports.ETypeEstatusRegistro;
exports.ONCOLOR = 'success';
exports.OFFCOLOR = 'warning';
exports.ONTEXT = 'Activo';
exports.OFFTEXT = 'Inactivo';
/**
 *
 */
(function (ETypeStatusCode) {
    /**
     *Indica que la solicitud se realizó correctamente y la información solicitada se incluye en la respuesta.
     */
    ETypeStatusCode[ETypeStatusCode["OK"] = 200] = "OK";
    /**
     *Indica que la solicitud dio como resultado un nuevo recurso.
     */
    ETypeStatusCode[ETypeStatusCode["CREATED"] = 201] = "CREATED";
    /**
     *Indica que el servidor no entendio la solicitud.
     */
    ETypeStatusCode[ETypeStatusCode["BADREQUEST"] = 400] = "BADREQUEST";
    /**
     *Indica que el recurso solicitado no existe en el servidor.
     */
    ETypeStatusCode[ETypeStatusCode["NOTFOUND"] = 404] = "NOTFOUND";
    /**
     *Indica que no se pudo realizar la solictud debido a un conflicto en el servidor.
     */
    ETypeStatusCode[ETypeStatusCode["CONFLICT"] = 409] = "CONFLICT";
    /**
     *Indica que se produjo un error generico en el servidor.
     */
    ETypeStatusCode[ETypeStatusCode["INTERNALSERVERERROR"] = 500] = "INTERNALSERVERERROR";
})(exports.ETypeStatusCode || (exports.ETypeStatusCode = {}));
var ETypeStatusCode = exports.ETypeStatusCode;
//# sourceMappingURL=const.service.js.map