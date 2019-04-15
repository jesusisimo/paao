webpackJsonp([6],{

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsuarioProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(167);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UsuarioProvider = /** @class */ (function () {
    function UsuarioProvider(http, alertCtrl, platform, storage, loadingCtrl) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.usuario = {};
        this.cargar_storage();
    }
    UsuarioProvider.prototype.si_sesion_iniciada = function () {
        if (this.token) {
            return true;
        }
        else {
            return false;
        }
    };
    UsuarioProvider.prototype.iniciar_sesion = function (correo, password, uid, provedor) {
        var _this = this;
        var data = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* URLSearchParams */]();
        data.append("correo", correo);
        data.append("password", password);
        var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["a" /* URL_SERVICIOS */] + "/login.php";
        return this.http.post(url, data)
            .map(function (resp) {
            var data_resp = resp.json();
            if (data_resp.error) {
                _this.alertCtrl.create({
                    title: "Error",
                    subTitle: data_resp.mensaje,
                    buttons: ["OK"]
                }).present();
            }
            else {
                _this.cargar_usuario(data_resp.id_usuario, data_resp.nombre, data_resp.apellidos, data_resp.foto, data_resp.correo, data_resp.token);
                _this.token = data_resp.token;
                _this.id_usuario = data_resp.id_usuario;
                _this.guardar_storage();
            }
        });
    };
    UsuarioProvider.prototype.iniciar_sesionProvedor = function (uid, nombre, apellidos, correo, foto, provedor) {
        var _this = this;
        var data = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* URLSearchParams */]();
        data.append("uid", uid);
        data.append("nombre", nombre);
        data.append("apellidos", apellidos);
        data.append("correo", correo);
        data.append("foto", foto);
        data.append("provedor", provedor);
        var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["a" /* URL_SERVICIOS */] + "/loginProvedor.php";
        return this.http.post(url, data)
            .map(function (resp) {
            var data_resp = resp.json();
            if (data_resp.error) {
                _this.alertCtrl.create({
                    title: "Error",
                    subTitle: data_resp.mensaje,
                    buttons: ["OK"]
                }).present();
            }
            else {
                _this.cargar_usuario(data_resp.id_usuario, data_resp.nombre, data_resp.apellidos, data_resp.foto, data_resp.correo, data_resp.token);
                _this.token = data_resp.token;
                _this.id_usuario = data_resp.id_usuario;
                _this.guardar_storage();
            }
        });
    };
    UsuarioProvider.prototype.obtener_informacion = function () {
        var _this = this;
        var data = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* URLSearchParams */]();
        data.append("id_usuario", this.id_usuario);
        var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["a" /* URL_SERVICIOS */] + "/usuario.php";
        return this.http.post(url, data)
            .map(function (resp) {
            var data_resp = resp.json();
            if (data_resp.error) {
                _this.alertCtrl.create({
                    title: "Error",
                    subTitle: data_resp.mensaje,
                    buttons: ["OK"]
                }).present();
            }
            else {
                _this.cargar_usuario(data_resp.id_usuario, data_resp.nombre, data_resp.apellidos, data_resp.foto, data_resp.correo, data_resp.token);
            }
        });
    };
    UsuarioProvider.prototype.cargar_usuario = function (id_usuario, nombre, apellidos, foto, email, token) {
        this.usuario.id_usuario = id_usuario;
        this.usuario.nombre = nombre;
        this.usuario.apellidos = apellidos;
        this.usuario.foto = foto;
        this.usuario.email = email;
        this.usuario.token = token;
    };
    UsuarioProvider.prototype.cerrar_sesion = function () {
        this.token = null;
        this.id_usuario = null;
        this.guardar_storage();
        var loader = this.loadingCtrl.create({
            content: "Cerrando Sesión...",
            duration: 3000
        });
        loader.present();
    };
    UsuarioProvider.prototype.registrar = function (nombre, apellidos, correo, password) {
        var _this = this;
        var data = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* URLSearchParams */]();
        data.append("nombre", nombre);
        data.append("apellidos", apellidos);
        data.append("email", correo);
        data.append("password", password);
        var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["a" /* URL_SERVICIOS */] + "/registro.php";
        return this.http.post(url, data)
            .map(function (resp) {
            var data_resp = resp.json();
            if (data_resp.error) {
                _this.alertCtrl.create({
                    title: "Error",
                    subTitle: data_resp.mensaje,
                    buttons: ["OK"]
                }).present();
            }
            else {
                _this.cargar_usuario(data_resp.id_usuario, data_resp.nombre, data_resp.apellidos, data_resp.foto, data_resp.correo, data_resp.token);
                _this.token = data_resp.token;
                _this.id_usuario = data_resp.id_usuario;
                _this.guardar_storage();
            }
        });
    };
    UsuarioProvider.prototype.guardar_storage = function () {
        if (this.platform.is("cordova")) {
            this.storage.set('token', this.token);
            this.storage.set('id_usuario', this.id_usuario);
        }
        else {
            if (this.token) {
                localStorage.setItem('token', this.token);
                localStorage.setItem('id_usuario', this.id_usuario);
            }
            else {
                localStorage.removeItem('token');
                localStorage.removeItem('id_usuario');
            }
        }
    };
    UsuarioProvider.prototype.cargar_storage = function () {
        var _this = this;
        var promesa = new Promise(function (resolve, reject) {
            if (_this.platform.is("cordova")) {
                _this.storage.ready()
                    .then(function () {
                    _this.storage.get("token")
                        .then(function (token) {
                        if (token) {
                            _this.token = token;
                        }
                    });
                    _this.storage.get("id_usuario")
                        .then(function (id_usuario) {
                        if (id_usuario) {
                            _this.id_usuario = id_usuario;
                            _this.obtener_informacion().subscribe();
                        }
                        resolve();
                    });
                });
            }
            else {
                if (localStorage.getItem("token")) {
                    _this.token = localStorage.getItem("token");
                    _this.id_usuario = localStorage.getItem("id_usuario");
                    _this.obtener_informacion().subscribe();
                }
                resolve();
            }
        });
        return promesa;
    };
    UsuarioProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* LoadingController */]])
    ], UsuarioProvider);
    return UsuarioProvider;
}());

//# sourceMappingURL=usuario.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificacionesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_onesignal__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_url_servicios__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_ajustes_ajustes__ = __webpack_require__(85);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var NotificacionesProvider = /** @class */ (function () {
    function NotificacionesProvider(http, oneSignal, platform, alertCtrl, _as, loadingCtrl) {
        this.http = http;
        this.oneSignal = oneSignal;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this._as = _as;
        this.loadingCtrl = loadingCtrl;
        this.pagina = 0;
        this.notificaciones = [];
    }
    NotificacionesProvider.prototype.init_notificaciones = function () {
        if (this.platform.is('cordova')) {
            this.oneSignal.startInit('bf955572-d630-44dc-bc5a-3d826efe620a', '843018529443');
            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
            this.oneSignal.handleNotificationReceived();
            this.oneSignal.handleNotificationOpened().subscribe(function () {
            });
            this.oneSignal.endInit();
        }
        else {
        }
    };
    NotificacionesProvider.prototype.presentAlert = function (mensaje) {
        var alert = this.alertCtrl.create({
            title: 'Notifiacion',
            subTitle: mensaje,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    NotificacionesProvider.prototype.cargar_todos = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Cargando...",
        });
        loader.present();
        var promesa = new Promise(function (resolve, reject) {
            var url = __WEBPACK_IMPORTED_MODULE_5__config_url_servicios__["a" /* URL_SERVICIOS */] + "/notificaciones.php?accion=get&pagina=" + _this.pagina + "&uuid=" + _this._as.ajustes.uuid;
            _this.http.get(url)
                .map(function (resp) { return resp.json(); })
                .subscribe(function (data) {
                var _a;
                if (data.error) {
                }
                else {
                    (_a = _this.notificaciones).push.apply(_a, data.notificaciones);
                    _this.pagina = _this.pagina += 1;
                }
                loader.dismiss();
                resolve();
            });
        });
        return promesa;
    };
    NotificacionesProvider.prototype.marcar_visto = function (id) {
        var _this = this;
        var promesa = new Promise(function (resolve, reject) {
            var url = __WEBPACK_IMPORTED_MODULE_5__config_url_servicios__["a" /* URL_SERVICIOS */] + "/notificaciones.php?accion=setvisto&uuid=" + _this._as.ajustes.uuid + "&notificacion=" + id;
            _this.http.get(url)
                .map(function (resp) { return resp.json(); })
                .subscribe(function (data) {
                resolve();
            });
        });
        return promesa;
    };
    NotificacionesProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_onesignal__["a" /* OneSignal */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_ajustes_ajustes__["a" /* AjustesProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */]])
    ], NotificacionesProvider);
    return NotificacionesProvider;
}());

//# sourceMappingURL=notificaciones.js.map

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__profesores_profesores__ = __webpack_require__(294);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_0__profesores_profesores__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__patrocinadores_patrocinadores__ = __webpack_require__(295);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_1__patrocinadores_patrocinadores__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__comites_comites__ = __webpack_require__(296);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__comites_comites__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__usuario_usuario__ = __webpack_require__(108);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_3__usuario_usuario__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ajustes_ajustes__ = __webpack_require__(85);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__ajustes_ajustes__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__notificaciones_notificaciones__ = __webpack_require__(169);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_5__notificaciones_notificaciones__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lugares_lugares__ = __webpack_require__(302);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_6__lugares_lugares__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ubicacion_ubicacion__ = __webpack_require__(303);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_7__ubicacion_ubicacion__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__votacion_votacion__ = __webpack_require__(305);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_8__votacion_votacion__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__actividades_actividades__ = __webpack_require__(306);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_9__actividades_actividades__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__paises_paises__ = __webpack_require__(307);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_10__paises_paises__["a"]; });











//# sourceMappingURL=index.services.js.map

/***/ }),

/***/ 251:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 251;

/***/ }),

/***/ 293:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/acercade/acercade.module": [
		672,
		5
	],
	"../pages/login/login.module": [
		673,
		4
	],
	"../pages/perfil/perfil.module": [
		674,
		3
	],
	"../pages/registro/registro.module": [
		675,
		2
	],
	"../pages/salones/salones.module": [
		676,
		1
	],
	"../pages/web/web.module": [
		677,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 293;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfesoresProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProfesoresProvider = /** @class */ (function () {
    function ProfesoresProvider(http, toastCtrl) {
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.pagina = 0;
        this.profesores = [];
    }
    ProfesoresProvider.prototype.cargar_todos = function (pais) {
        var _this = this;
        var promesa = new Promise(function (resolve, reject) {
            var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["a" /* URL_SERVICIOS */] + "/profesores.php?todos&pagina=" + _this.pagina + "&pais=" + pais;
            _this.http.get(url)
                .map(function (resp) { return resp.json(); })
                .subscribe(function (data) {
                var _a;
                if (data.error) {
                }
                else {
                    (_a = _this.profesores).push.apply(_a, data.profesores);
                    _this.pagina = _this.pagina += 1;
                }
                resolve();
            });
        });
        return promesa;
    };
    ProfesoresProvider.prototype.buscar_profesor = function (profesor) {
        var _this = this;
        this.profesores = [];
        var promesa = new Promise(function (resolve, reject) {
            var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["a" /* URL_SERVICIOS */] + "/profesores.php?search=" + profesor;
            _this.http.get(url)
                .map(function (resp) { return resp.json(); })
                .subscribe(function (data) {
                var _a;
                if (data.error) {
                }
                else {
                    (_a = _this.profesores).push.apply(_a, data.profesores);
                    _this.pagina = _this.pagina += 1;
                }
                resolve();
            });
        });
        return promesa;
    };
    ProfesoresProvider.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    ProfesoresProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* ToastController */]])
    ], ProfesoresProvider);
    return ProfesoresProvider;
}());

//# sourceMappingURL=profesores.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PatrocinadoresProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PatrocinadoresProvider = /** @class */ (function () {
    function PatrocinadoresProvider(http, toastCtrl) {
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.pagina = 0;
        this.patrocinadores = [];
    }
    PatrocinadoresProvider.prototype.cargar_todos = function () {
        var _this = this;
        var promesa = new Promise(function (resolve, reject) {
            var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["a" /* URL_SERVICIOS */] + "/patrocinadores.php?todos&pagina=" + _this.pagina;
            _this.http.get(url)
                .map(function (resp) { return resp.json(); })
                .subscribe(function (data) {
                var _a;
                if (data.error) {
                }
                else {
                    (_a = _this.patrocinadores).push.apply(_a, data.patrocinadores);
                    _this.pagina = _this.pagina += 1;
                }
                resolve();
            });
        });
        return promesa;
    };
    PatrocinadoresProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* ToastController */]])
    ], PatrocinadoresProvider);
    return PatrocinadoresProvider;
}());

//# sourceMappingURL=patrocinadores.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComitesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ComitesProvider = /** @class */ (function () {
    function ComitesProvider(http, toastCtrl) {
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.pagina = 0;
        this.comites = [];
    }
    ComitesProvider.prototype.cargar_todos = function () {
        var _this = this;
        var promesa = new Promise(function (resolve, reject) {
            var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["a" /* URL_SERVICIOS */] + "/comite.php?todos&pagina=" + _this.pagina;
            _this.http.get(url)
                .map(function (resp) { return resp.json(); })
                .subscribe(function (data) {
                var _a;
                if (data.error) {
                }
                else {
                    (_a = _this.comites).push.apply(_a, data.comites);
                    _this.pagina = _this.pagina += 1;
                }
                resolve();
            });
        });
        return promesa;
    };
    ComitesProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* ToastController */]])
    ], ComitesProvider);
    return ComitesProvider;
}());

//# sourceMappingURL=comites.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LugaresProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LugaresProvider = /** @class */ (function () {
    function LugaresProvider(http, toastCtrl) {
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.pagina = 0;
        this.lugares = [];
    }
    LugaresProvider.prototype.cargar_todos = function () {
        var _this = this;
        var promesa = new Promise(function (resolve, reject) {
            var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["a" /* URL_SERVICIOS */] + "/lugares.php?todos&pagina=" + _this.pagina;
            _this.http.get(url)
                .map(function (resp) { return resp.json(); })
                .subscribe(function (data) {
                var _a;
                if (data.error) {
                }
                else {
                    (_a = _this.lugares).push.apply(_a, data.lugares);
                    _this.pagina = _this.pagina += 1;
                }
                resolve();
            });
        });
        return promesa;
    };
    LugaresProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* ToastController */]])
    ], LugaresProvider);
    return LugaresProvider;
}());

//# sourceMappingURL=lugares.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UbicacionProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_geolocation__ = __webpack_require__(304);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UbicacionProvider = /** @class */ (function () {
    function UbicacionProvider(geolocation) {
        this.geolocation = geolocation;
        this.compartiendo = true;
        this.iniciarGeolocalizacion();
    }
    UbicacionProvider.prototype.iniciarGeolocalizacion = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            console.log("Primera vez", resp.coords);
            _this.latitud = resp.coords.latitude;
            _this.longitud = resp.coords.longitude;
            _this.compartiendo = true;
        }).catch(function (error) {
            _this.compartiendo = false;
        });
        var watch = this.geolocation.watchPosition();
        watch.subscribe(function (data) {
            _this.compartiendo = true;
            _this.latitud = data.coords.latitude;
            _this.longitud = data.coords.longitude;
        });
    };
    UbicacionProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_geolocation__["a" /* Geolocation */]])
    ], UbicacionProvider);
    return UbicacionProvider;
}());

//# sourceMappingURL=ubicacion.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VotacionProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_index_services__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var VotacionProvider = /** @class */ (function () {
    function VotacionProvider(http, toastCtrl, alertCtrl, usuario) {
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.usuario = usuario;
        this.opciones = [];
        this.error = true;
    }
    VotacionProvider.prototype.cargar_pregunta = function () {
        var _this = this;
        this.opcion_seleccionada = "0";
        this.opciones = [];
        var promesa = new Promise(function (resolve, reject) {
            var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["a" /* URL_SERVICIOS */] + "/votaciones.php?get&usuario_id=" + _this.usuario.id_usuario;
            _this.http.get(url)
                .map(function (resp) { return resp.json(); })
                .subscribe(function (data) {
                var _a;
                if (data.error) {
                    _this.opcion_seleccionada = "";
                    _this.opciones = [];
                    _this.pregunta = "";
                    _this.error = data.error;
                    ;
                    _this.mensaje = data.mensaje;
                }
                else {
                    _this.error = data.error;
                    ;
                    _this.opcion_seleccionada = "0";
                    (_a = _this.opciones).push.apply(_a, data.opciones);
                    _this.pregunta = data.pregunta;
                    _this.pregunta_id = data.id;
                    _this.mensaje = data.mensaje;
                    _this.contestada = data.contestada;
                }
                resolve();
            });
        });
        return promesa;
    };
    VotacionProvider.prototype.enviar_respuesta = function (pregunta_id, opcion_id, usuario_id) {
        var _this = this;
        var data = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* URLSearchParams */]();
        data.append("pregunta_id", pregunta_id);
        data.append("opcion_id", opcion_id);
        data.append("usuario_id", usuario_id);
        var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["a" /* URL_SERVICIOS */] + "/votaciones.php?votar";
        return this.http.post(url, data)
            .map(function (resp) {
            var data_resp = resp.json();
            if (data_resp.error) {
                _this.alertCtrl.create({
                    title: "Error",
                    subTitle: data_resp.mensaje,
                    buttons: ["OK"]
                }).present();
            }
            else {
                _this.cargar_pregunta();
            }
        });
    };
    VotacionProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__providers_index_services__["j" /* UsuarioProvider */]])
    ], VotacionProvider);
    return VotacionProvider;
}());

//# sourceMappingURL=votacion.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActividadesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ActividadesProvider = /** @class */ (function () {
    function ActividadesProvider(http, toastCtrl) {
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.dias = [];
        this.diasprofesor = [];
        this.actividad = [];
    }
    ActividadesProvider.prototype.cargar_todos = function () {
        var _this = this;
        this.dias = [];
        var promesa = new Promise(function (resolve, reject) {
            var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["a" /* URL_SERVICIOS */] + "/minutoxminuto.php";
            _this.http.get(url)
                .map(function (resp) { return resp.json(); })
                .subscribe(function (data) {
                var _a;
                if (data.error) {
                }
                else {
                    (_a = _this.dias).push.apply(_a, data.dias);
                    _this.diaactual = data.diaactual;
                }
                resolve();
            });
        });
        return promesa;
    };
    ActividadesProvider.prototype.cargar_actividad = function (id_actividad) {
        var _this = this;
        this.actividad = [];
        var promesa = new Promise(function (resolve, reject) {
            var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["a" /* URL_SERVICIOS */] + "/actividad.php?actividad_id=" + id_actividad;
            _this.http.get(url)
                .map(function (resp) { return resp.json(); })
                .subscribe(function (data) {
                if (data.error) {
                }
                else {
                    _this.actividad = data;
                }
                resolve();
            });
        });
        return promesa;
    };
    ActividadesProvider.prototype.cargar_por_profesor = function (profesor) {
        var _this = this;
        var promesa = new Promise(function (resolve, reject) {
            var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["a" /* URL_SERVICIOS */] + "/actividadesprofesor.php?profesor=" + profesor;
            _this.http.get(url)
                .map(function (resp) { return resp.json(); })
                .subscribe(function (data) {
                var _a;
                if (data.error) {
                }
                else {
                    (_a = _this.diasprofesor).push.apply(_a, data.dias);
                }
                resolve();
            });
        });
        return promesa;
    };
    ActividadesProvider.prototype.buscar_actividad = function (actividad) {
        var _this = this;
        this.dias = [];
        var promesa = new Promise(function (resolve, reject) {
            var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["a" /* URL_SERVICIOS */] + "/minutoxminuto.php?search=" + actividad;
            _this.http.get(url)
                .map(function (resp) { return resp.json(); })
                .subscribe(function (data) {
                var _a;
                if (data.error) {
                }
                else {
                    (_a = _this.dias).push.apply(_a, data.dias);
                }
                resolve();
            });
        });
        return promesa;
    };
    ActividadesProvider.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    ActividadesProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* ToastController */]])
    ], ActividadesProvider);
    return ActividadesProvider;
}());

//# sourceMappingURL=actividades.js.map

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaisesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PaisesProvider = /** @class */ (function () {
    function PaisesProvider(http, toastCtrl) {
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.pagina = 0;
        this.paises = [];
    }
    PaisesProvider.prototype.cargar_todos = function () {
        var _this = this;
        var promesa = new Promise(function (resolve, reject) {
            var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["a" /* URL_SERVICIOS */] + "/paises.php?todos&pagina=" + _this.pagina;
            _this.http.get(url)
                .map(function (resp) { return resp.json(); })
                .subscribe(function (data) {
                var _a;
                if (data.error) {
                }
                else {
                    (_a = _this.paises).push.apply(_a, data.paises);
                    _this.pagina = _this.pagina += 1;
                }
                resolve();
            });
        });
        return promesa;
    };
    PaisesProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* ToastController */]])
    ], PaisesProvider);
    return PaisesProvider;
}());

//# sourceMappingURL=paises.js.map

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_paginas__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_usuario_usuario__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = /** @class */ (function () {
    function TabsPage(_us, modalCtrl, navCtrl) {
        this._us = _us;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.apps = __WEBPACK_IMPORTED_MODULE_1__index_paginas__["n" /* PrincipalPage */];
        this.notifications = __WEBPACK_IMPORTED_MODULE_1__index_paginas__["i" /* NotificacionesPage */];
        this.web = __WEBPACK_IMPORTED_MODULE_1__index_paginas__["u" /* WebPage */];
    }
    TabsPage.prototype.ver_perfil = function () {
        if (this._us.si_sesion_iniciada()) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__index_paginas__["m" /* PerfilPage */]);
        }
        else {
            var modal = void 0;
            modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_1__index_paginas__["e" /* LoginPage */]);
            modal.present();
        }
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tabs',template:/*ion-inline-start:"/Users/brb/Desktop/ionic/paoo/src/pages/tabs/tabs.html"*/'<ion-tabs color="secondary" selectedIndex="1">\n	\n<!-- 	<ion-tab tabIcon="settings" [root]="web"></ion-tab>\n-->	<ion-tab tabIcon="notifications"  [root]="notifications" tabTitle="Notificaciones"></ion-tab>\n<ion-tab tabIcon="home" [root]="apps" tabTitle="Inicio"></ion-tab>\n<!-- 	<ion-tab tabIcon="star"  [root]="favoritos"></ion-tab>\n-->\n<ion-tab  tabIcon="contact" (ionSelect)="ver_perfil()" tabTitle="Perfil"></ion-tab>\n\n\n<!-- <ion-tab tabIcon="log-out" [root]="salir"></ion-tab> -->\n\n\n'/*ion-inline-end:"/Users/brb/Desktop/ionic/paoo/src/pages/tabs/tabs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_usuario_usuario__["a" /* UsuarioProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__principal_principal__ = __webpack_require__(542);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_0__principal_principal__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tabs_tabs__ = __webpack_require__(308);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return __WEBPACK_IMPORTED_MODULE_1__tabs_tabs__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notificaciones_notificaciones__ = __webpack_require__(543);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_2__notificaciones_notificaciones__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profesores_profesores__ = __webpack_require__(544);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_3__profesores_profesores__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__comite_comite__ = __webpack_require__(545);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__comite_comite__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__salones_salones__ = __webpack_require__(391);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_5__salones_salones__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__paises_paises__ = __webpack_require__(546);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_6__paises_paises__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__minutoxminuto_minutoxminuto__ = __webpack_require__(547);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_7__minutoxminuto_minutoxminuto__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__lugares_lugares__ = __webpack_require__(548);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_8__lugares_lugares__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__profesordetalle_profesordetalle__ = __webpack_require__(549);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_9__profesordetalle_profesordetalle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__login_login__ = __webpack_require__(390);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_10__login_login__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__patrocinadores_patrocinadores__ = __webpack_require__(550);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_11__patrocinadores_patrocinadores__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__patrocinador_patrocinador__ = __webpack_require__(551);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_12__patrocinador_patrocinador__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__perfil_perfil__ = __webpack_require__(392);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_13__perfil_perfil__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__introduccion_introduccion__ = __webpack_require__(552);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_14__introduccion_introduccion__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__notificacion_notificacion__ = __webpack_require__(553);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_15__notificacion_notificacion__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__registro_registro__ = __webpack_require__(393);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __WEBPACK_IMPORTED_MODULE_16__registro_registro__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__votacion_votacion__ = __webpack_require__(554);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return __WEBPACK_IMPORTED_MODULE_17__votacion_votacion__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__actividad_actividad__ = __webpack_require__(555);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_18__actividad_actividad__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__web_web__ = __webpack_require__(394);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return __WEBPACK_IMPORTED_MODULE_19__web_web__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__acercade_acercade__ = __webpack_require__(389);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_20__acercade_acercade__["a"]; });





















//# sourceMappingURL=index.paginas.js.map

/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AcercadePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AcercadePage = /** @class */ (function () {
    function AcercadePage(navCtrl, menuCtrl) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
    }
    AcercadePage.prototype.mostrar_menu = function () {
        this.menuCtrl.toggle();
    };
    AcercadePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-acercade',template:/*ion-inline-start:"/Users/brb/Desktop/ionic/paoo/src/pages/acercade/acercade.html"*/'<ion-header>\n\n	<ion-navbar color="primary">\n		<ion-title >Acerca de</ion-title>\n		<ion-buttons>\n			<button ion-button ion-only (click)="mostrar_menu()">\n				<ion-icon name="menu"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding style="background-color:  #E8B46B; color:#002549" >\n\n	<h3>Aplicación AppEvent</h3>\n\n	<p>XVIII Congreso de SOMERA</p>\n	<p>Sociedad Mexicana de Radiooncólogos</p>\n	<br>\n	<p>\n		Todos los datos recabados en esta aplicación están protegidos por Ley Federal de Protección de Datos Personales en Posesión de Particulares que puede consultar en https://brb.com.mx/aviso-privacidad.php\n	</p>\n	<p>\n		Todas las marcas y marcas registradas mostradas en este sitio, así como todos los logotipos mostrados en esta aplicación son propiedad de sus respectivos propietarios.\n	</p>\n	<p>\n		Todas los conocimientos académicos mostrados en las pláticas, pdf´s, y videos es el producto de la investigación y opinión de cada uno de los profesores, no representando, en todos los casos, la opinión de la Sociedad Mexicana de Radiooncólogos, la finalidad de este conocimiento es la actualización médica contínua.\n	</p>\n	<br>\n	<p>\n		Desarrollo por:\n		<br>\n		Consultores en Tecnología e innovación BRB, S.A. de C.V<br>\n		Calle 26 A #34, Col. Santa Rosa, Gustavo A. Madero 07620, CDMX <br>\n		Teléfono:  (55) – 65 52 59 45<br>\n		Sitio web: https://brb.com.mx<br>\n		Comentarios y sugerencias: jesus@brb.com.mx\n\n	</p>\n</ion-content>\n'/*ion-inline-end:"/Users/brb/Desktop/ionic/paoo/src/pages/acercade/acercade.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */]])
    ], AcercadePage);
    return AcercadePage;
}());

//# sourceMappingURL=acercade.js.map

/***/ }),

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_index_services__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index_paginas__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_fire_auth__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase_app__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_plus__ = __webpack_require__(328);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//firebase


//facebook

//google plus falta clave de produccion

var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, modalCtrl, viewCtrl, loadingCtrl, _us, afAuth, fb, googlePlus, platform, _as) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this._us = _us;
        this.afAuth = afAuth;
        this.fb = fb;
        this.googlePlus = googlePlus;
        this.platform = platform;
        this._as = _as;
        this.correo = "";
        this.password = "";
    }
    LoginPage.prototype.singInWhitGoogle = function () {
        var _this = this;
        this.googlePlus.login({
            'webClientId': '843018529443-hjcu4t82rtlrf4fkltelfao3jvcq03p5.apps.googleusercontent.com',
            'offline': true
        }).then(function (res) {
            __WEBPACK_IMPORTED_MODULE_5_firebase_app___default.a.auth().signInWithCredential(__WEBPACK_IMPORTED_MODULE_5_firebase_app___default.a.auth.GoogleAuthProvider.credential(res.idToken))
                .then(function (user) {
                _this.ingresarProvedor(user.uid, user.displayName, "", user.email, user.photoURL, "google");
            })
                .catch(function (error) { return console.log("Firebase failure: " + JSON.stringify(error)); });
        }).catch(function (err) { return console.error("Error: ", err); });
    };
    LoginPage.prototype.signInWithFacebook = function () {
        var _this = this;
        if (this.platform.is('cordova')) {
            this.fb.login(['email', 'public_profile']).then(function (res) {
                var facebookCredential = __WEBPACK_IMPORTED_MODULE_5_firebase_app___default.a.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
                __WEBPACK_IMPORTED_MODULE_5_firebase_app___default.a.auth().signInWithCredential(facebookCredential)
                    .then(function (user) {
                    _this.ingresarProvedor(user.uid, user.displayName, "", user.email, user.photoURL, "facebook");
                }).catch(function (e) { return console.log("Error con el login: ", JSON.stringify(e)); });
            });
        }
        else {
            this.afAuth.auth
                .signInWithPopup(new __WEBPACK_IMPORTED_MODULE_5_firebase_app___default.a.auth.FacebookAuthProvider())
                .then(function (res) {
                var user = res.user;
                _this.ingresarProvedor(user.uid, user.displayName, "", user.email, user.photoURL, "facebook");
            });
        }
    };
    LoginPage.prototype.abrir_registro = function () {
        var _this = this;
        var registro = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__index_paginas__["q" /* RegistroPage */]);
        registro.onDidDismiss(function (data) {
            if (data) {
                _this.cargar_perfil();
            }
        });
        registro.present();
    };
    LoginPage.prototype.cargar_perfil = function () {
        this.navCtrl.pop();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__index_paginas__["m" /* PerfilPage */]);
    };
    LoginPage.prototype.ingresar = function () {
        var _this = this;
        if (this._as.online) {
            var loader_1 = this.loadingCtrl.create({
                content: "Validando...",
            });
            loader_1.present();
            this._us.iniciar_sesion(this.correo, this.password, "", "").subscribe(function () {
                loader_1.dismiss();
                if (_this._us.si_sesion_iniciada()) {
                    _this.cargar_perfil();
                }
            });
        }
        else {
            this._as.mostrar_toast("No hay conexion a internet");
        }
    };
    LoginPage.prototype.ingresarProvedor = function (uid, nombre, apellidos, correo, foto, provedor) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Espere un momento...",
        });
        loader.present();
        this._us.iniciar_sesionProvedor(uid, nombre, apellidos, correo, foto, provedor).subscribe(function () {
            loader.dismiss();
            if (_this._us.si_sesion_iniciada()) {
                _this.cargar_perfil();
            }
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/brb/Desktop/ionic/paoo/src/pages/login/login.html"*/'<ion-header>\n\n	<ion-navbar color="primary">\n		<ion-title>Iniciar Sesión</ion-title>\n		<ion-buttons start>\n			<button ion-button (click)="viewCtrl.dismiss()">\n				<span ion-text color="light" showWhen="ios">Cancelar</span>\n				<ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n<ion-content padding>\n\n\n	<ion-list>\n		<p padding>Ingresa tu correo y contraseña con la que te registraste.</p>\n		<ion-item>\n			<ion-label floating>Correo:</ion-label>\n			<ion-input type="email" [(ngModel)]="correo"></ion-input>\n		</ion-item>\n\n		<ion-item>\n			<ion-label floating>Contraseña:</ion-label>\n			<ion-input type="password" [(ngModel)]="password"></ion-input>\n		</ion-item>\n\n		<div padding>\n			<button [disabled]="correo.length < 5 || password.length < 5 " ion-button block (click)="ingresar()">Inicia Sesión</button>\n		</div>\n\n		<p text-center >- O -</p>\n\n		<div padding>\n			<button ion-button color="facebook" block icon-left (click)="signInWithFacebook();">\n				<ion-icon name="logo-facebook"></ion-icon>\n				Facebook\n			</button>\n			\n		</div>\n		<hr>\n\n		<div padding>\n			<button ion-button color="light" block (click)="abrir_registro();" >Regístrate</button>\n		</div>\n	</ion-list>\n	\n</ion-content>\n'/*ion-inline-end:"/Users/brb/Desktop/ionic/paoo/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_index_services__["j" /* UsuarioProvider */],
            __WEBPACK_IMPORTED_MODULE_4__angular_fire_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_plus__["a" /* GooglePlus */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__providers_index_services__["b" /* AjustesProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SalonesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the SalonesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SalonesPage = /** @class */ (function () {
    function SalonesPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    SalonesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalonesPage');
    };
    SalonesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-salones',template:/*ion-inline-start:"/Users/brb/Desktop/ionic/paoo/src/pages/salones/salones.html"*/'<!--\n  Generated template for the SalonesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>salones</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/brb/Desktop/ionic/paoo/src/pages/salones/salones.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], SalonesPage);
    return SalonesPage;
}());

//# sourceMappingURL=salones.js.map

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PerfilPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_usuario_usuario__ = __webpack_require__(108);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PerfilPage = /** @class */ (function () {
    function PerfilPage(navCtrl, navParams, viewCtrl, _us) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this._us = _us;
        this.titulo = "Perfil";
        this.usuario = {};
        this.usuario = this._us.usuario;
        this.titulo = this.usuario.nombre + " " + this.usuario.apellidos;
    }
    PerfilPage.prototype.cerrar_sesion = function () {
        this._us.cerrar_sesion();
        this.navCtrl.pop();
    };
    PerfilPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    PerfilPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-perfil',template:/*ion-inline-start:"/Users/brb/Desktop/ionic/paoo/src/pages/perfil/perfil.html"*/'<ion-header>\n\n	<ion-navbar color="primary">\n		<ion-title>{{ titulo }}</ion-title>\n		<ion-buttons end>\n			<button ion-button (click)="viewCtrl.dismiss(false)">\n				<span ion-text color="light" showWhen="ios">Cerrar</span>\n				<ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding >\n	<ion-card>\n		<ion-avatar text-center>\n			<img ion-img src="{{usuario.foto}}"/>\n		</ion-avatar>\n		<ion-card-content>\n			<ion-card-title>\n				{{usuario.nombre}} {{usuario.apellidos}} \n			</ion-card-title>\n			<p>\n				{{usuario.email}}\n			</p>\n		</ion-card-content>\n	</ion-card>\n\n	<hr>\n	<div padding>\n		<button ion-button color="primary" block (click)="viewCtrl.dismiss(false)">Cerrar</button>\n	</div>\n	<div padding>\n		<button ion-button color="secondary" block (click)="cerrar_sesion()">Cerrar mi sesión</button>\n	</div>\n</ion-content>\n'/*ion-inline-end:"/Users/brb/Desktop/ionic/paoo/src/pages/perfil/perfil.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_usuario_usuario__["a" /* UsuarioProvider */]])
    ], PerfilPage);
    return PerfilPage;
}());

//# sourceMappingURL=perfil.js.map

/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_index_services__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RegistroPage = /** @class */ (function () {
    function RegistroPage(navCtrl, loadingCtrl, viewCtrl, _us, _as) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this._us = _us;
        this._as = _as;
        this.nombre = "";
        this.apellidos = "";
        this.correo = "";
        this.password = "";
    }
    RegistroPage.prototype.guardar = function () {
        var _this = this;
        if (this._as.online) {
            var loader_1 = this.loadingCtrl.create({
                content: "Espere un momento...",
            });
            loader_1.present();
            this._us.registrar(this.nombre, this.apellidos, this.correo, this.password).subscribe(function () {
                loader_1.dismiss();
                if (_this._us.si_sesion_iniciada()) {
                    _this.viewCtrl.dismiss(true);
                }
            });
        }
        else {
            this._as.mostrar_toast("No hay conexion a internet");
        }
    };
    RegistroPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-registro',template:/*ion-inline-start:"/Users/brb/Desktop/ionic/paoo/src/pages/registro/registro.html"*/'<ion-header>\n\n	<ion-navbar color="primary">\n		<ion-title>Registro</ion-title>\n		<ion-buttons end>\n			<button ion-button (click)="viewCtrl.dismiss(false)">\n				<span ion-text color="light" showWhen="ios">Cancelar</span>\n				<ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n<ion-content padding>\n\n\n	<ion-list>\n		<h3 padding text-center>Formulario de inscripción a la app del evento.</h3>\n		<ion-item>\n			<ion-label floating>Nombre:</ion-label>\n			<ion-input type="text" [(ngModel)]="nombre"></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label floating>Apellidos:</ion-label>\n			<ion-input type="text" [(ngModel)]="apellidos"></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label floating>Correo:</ion-label>\n			<ion-input type="email" [(ngModel)]="correo"></ion-input>\n		</ion-item>\n\n		<ion-item>\n			<ion-label floating>Contraseña <small>5 caracteres minimo</small>:</ion-label>\n			<ion-input type="password" [(ngModel)]="password"></ion-input>\n		</ion-item>\n\n		<div padding>\n			<button [disabled]="correo.length < 5 || password.length < 5 " ion-button block (click)="guardar()">Guardar</button>\n		</div>\n\n	</ion-list>\n	\n</ion-content>\n'/*ion-inline-end:"/Users/brb/Desktop/ionic/paoo/src/pages/registro/registro.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_index_services__["j" /* UsuarioProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_index_services__["b" /* AjustesProvider */]])
    ], RegistroPage);
    return RegistroPage;
}());

//# sourceMappingURL=registro.js.map

/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_index_services__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var WebPage = /** @class */ (function () {
    function WebPage(navCtrl, navParams, sanitizer, _as, _us) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sanitizer = sanitizer;
        this._as = _as;
        this._us = _us;
        if (this._us.si_sesion_iniciada()) {
            this.url = this.navParams.get("url") + "&usuario=" + _us.id_usuario;
        }
        else {
            this.url = this.navParams.get("url");
        }
        console.log(this.url);
    }
    WebPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-web',template:/*ion-inline-start:"/Users/brb/Desktop/ionic/paoo/src/pages/web/web.html"*/'<ion-navbar color="primary">\n	\n	<ion-buttons>\n		<button ion-button ion-only (click)="mostrar_menu()">\n			<ion-icon name="menu"></ion-icon>\n		</button>\n	</ion-buttons>\n</ion-navbar>\n<ion-content scroll="true" overflow-scroll="true">\n	<iframe [src]="sanitizer.bypassSecurityTrustResourceUrl(url)" data-tap-disabled="true" scrolling="no" frameborder="0" allowfullscreen style="width: 100%; height: 100%;" class="iframe"  ></iframe>\n</ion-content>\n'/*ion-inline-end:"/Users/brb/Desktop/ionic/paoo/src/pages/web/web.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_3__providers_index_services__["b" /* AjustesProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_index_services__["j" /* UsuarioProvider */]])
    ], WebPage);
    return WebPage;
}());

//# sourceMappingURL=web.js.map

/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(508);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return URL_SERVICIOS; });
var URL_SERVICIOS = "http://wsbrb-services.com/smo/servicios";
//# sourceMappingURL=url.servicios.js.map

/***/ }),

/***/ 508:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(652);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_onesignal__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_device__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_toast__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_facebook__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_google_plus__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_network__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_fire__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_fire_database__ = __webpack_require__(653);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_fire_auth__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__agm_core__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__agm_js_marker_clusterer__ = __webpack_require__(667);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_geolocation__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_profesores_profesores__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_patrocinadores_patrocinadores__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_comites_comites__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_usuario_usuario__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__providers_ajustes_ajustes__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__providers_notificaciones_notificaciones__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__providers_lugares_lugares__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__providers_ubicacion_ubicacion__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers_votacion_votacion__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__providers_actividades_actividades__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__providers_paises_paises__ = __webpack_require__(307);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












//facebook

//google plus falta clave de produccion

//internet

//firebase



//maps


//geolocalizacion

var firebaseConfig = {
    apiKey: "AIzaSyAifPFL8fYD5RtcHczddU6TeM3tCJcXkD0",
    authDomain: "app-somera.firebaseapp.com",
    databaseURL: "https://app-somera.firebaseio.com",
    projectId: "app-somera",
    storageBucket: "app-somera.appspot.com",
    messagingSenderId: "843018529443"
};












var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["n" /* PrincipalPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["s" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["i" /* NotificacionesPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["p" /* ProfesoresPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["c" /* ComitePage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["r" /* SalonesPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["j" /* PaisesPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["g" /* MinutoxminutoPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["f" /* LugaresPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["o" /* ProfesordetallePage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["e" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["m" /* PerfilPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["l" /* PatrocinadoresPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["d" /* IntroduccionPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["k" /* PatrocinadorPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["h" /* NotificacionPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["q" /* RegistroPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["t" /* VotacionPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["b" /* ActividadPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["u" /* WebPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["a" /* AcercadePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], { backButtonText: 'Atras' }, {
                    links: [
                        { loadChildren: '../pages/acercade/acercade.module#AcercadePageModule', name: 'AcercadePage', segment: 'acercade', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/perfil/perfil.module#PerfilPageModule', name: 'PerfilPage', segment: 'perfil', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/registro/registro.module#RegistroPageModule', name: 'RegistroPage', segment: 'registro', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/salones/salones.module#SalonesPageModule', name: 'SalonesPage', segment: 'salones', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/web/web.module#WebPageModule', name: 'WebPage', segment: 'web', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["a" /* IonicStorageModule */].forRoot({ name: '__appevent', driverOrder: ['indexeddb', 'sqlite', 'websql'] }),
                __WEBPACK_IMPORTED_MODULE_15__angular_fire__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_16__angular_fire_database__["a" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_17__angular_fire_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_18__agm_core__["a" /* AgmCoreModule */].forRoot({
                    apiKey: 'AIzaSyC-4M9bYMqK1gRkrIeF7E5vRXG0aC31ivE'
                }),
                __WEBPACK_IMPORTED_MODULE_19__agm_js_marker_clusterer__["a" /* AgmJsMarkerClustererModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["n" /* PrincipalPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["s" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["i" /* NotificacionesPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["p" /* ProfesoresPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["c" /* ComitePage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["r" /* SalonesPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["j" /* PaisesPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["g" /* MinutoxminutoPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["f" /* LugaresPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["o" /* ProfesordetallePage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["e" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["m" /* PerfilPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["l" /* PatrocinadoresPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["d" /* IntroduccionPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["k" /* PatrocinadorPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["h" /* NotificacionPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["q" /* RegistroPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["t" /* VotacionPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["b" /* ActividadPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["u" /* WebPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_index_paginas__["a" /* AcercadePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_22__providers_profesores_profesores__["a" /* ProfesoresProvider */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_23__providers_patrocinadores_patrocinadores__["a" /* PatrocinadoresProvider */],
                __WEBPACK_IMPORTED_MODULE_24__providers_comites_comites__["a" /* ComitesProvider */],
                __WEBPACK_IMPORTED_MODULE_25__providers_usuario_usuario__["a" /* UsuarioProvider */],
                __WEBPACK_IMPORTED_MODULE_26__providers_ajustes_ajustes__["a" /* AjustesProvider */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_onesignal__["a" /* OneSignal */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_device__["a" /* Device */],
                __WEBPACK_IMPORTED_MODULE_27__providers_notificaciones_notificaciones__["a" /* NotificacionesProvider */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_facebook__["a" /* Facebook */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_google_plus__["a" /* GooglePlus */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_toast__["a" /* Toast */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_26__providers_ajustes_ajustes__["a" /* AjustesProvider */],
                __WEBPACK_IMPORTED_MODULE_28__providers_lugares_lugares__["a" /* LugaresProvider */],
                __WEBPACK_IMPORTED_MODULE_29__providers_ubicacion_ubicacion__["a" /* UbicacionProvider */],
                __WEBPACK_IMPORTED_MODULE_30__providers_votacion_votacion__["a" /* VotacionProvider */],
                __WEBPACK_IMPORTED_MODULE_31__providers_actividades_actividades__["a" /* ActividadesProvider */],
                __WEBPACK_IMPORTED_MODULE_32__providers_paises_paises__["a" /* PaisesProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 542:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrincipalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_paginas__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_index_services__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__ = __webpack_require__(170);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PrincipalPage = /** @class */ (function () {
    function PrincipalPage(iab, navCtrl, navParams, menuCtrl, ajustes) {
        this.iab = iab;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.ajustes = ajustes;
        this.profesores = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["p" /* ProfesoresPage */];
        this.comite = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["c" /* ComitePage */];
        this.salones = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["r" /* SalonesPage */];
        this.minutoxminuto = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["g" /* MinutoxminutoPage */];
        this.patrocinadores = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["l" /* PatrocinadoresPage */];
        this.introduccion = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["d" /* IntroduccionPage */];
        this.lugares = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["f" /* LugaresPage */];
        this.paises = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["j" /* PaisesPage */];
        this.votacion = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["t" /* VotacionPage */];
        this.detallespatrocinador = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["k" /* PatrocinadorPage */];
        this.web = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["u" /* WebPage */];
    }
    PrincipalPage.prototype.navegarPagina = function (pagina) {
        this.navCtrl.push(pagina);
    };
    PrincipalPage.prototype.abrirWeb = function (url, target) {
        if (target == "_system") {
            this.visitar_pagina(url);
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__index_paginas__["u" /* WebPage */], { 'url': url });
        }
    };
    PrincipalPage.prototype.mostrar_menu = function () {
        this.menuCtrl.toggle();
    };
    PrincipalPage.prototype.visitar_pagina = function (url) {
        if (url === void 0) { url = ""; }
        if (url != "") {
            this.iab.create(url, "_system");
        }
    };
    PrincipalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-principal',template:/*ion-inline-start:"/Users/brb/Desktop/ionic/paoo/src/pages/principal/principal.html"*/'<ion-header>\n	<ion-toolbar color="primary">\n		<ion-title>PAOO</ion-title>\n		<ion-buttons start left>\n			<button (click)="mostrar_menu()" ion-button small icon-only color="royal">\n				<ion-icon name="menu"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-toolbar>\n</ion-header>\n\n\n\n<ion-content text-center class="icons-basic-page">\n	<img src="assets/imgs/banner.jpg"/>\n	<ion-row>\n		<ion-col>\n			<ion-icon name="clock" color="light" (click)="navegarPagina(minutoxminuto)"></ion-icon>\n			<p color="light">Programa General</p>\n		</ion-col>\n		<ion-col>\n			<ion-icon name="search" color="light" (click)="navegarPagina(profesores)"></ion-icon>\n			<p color="light">Buscador</p>\n		</ion-col>\n		<ion-col>\n			<ion-icon name="map" color="light" ></ion-icon>\n			<p color="light">Esquema General</p>\n		</ion-col>\n		<ion-col>\n			<ion-icon name="easel" color="light" ></ion-icon>\n			<p color="light">Carteles</p>\n		</ion-col>\n		<ion-col>\n			<ion-icon name="play" color="light" ></ion-icon>\n			<p color="light">Videos</p>\n		</ion-col>\n		<ion-col>\n			<ion-buttons>\n				<img  src="../assets/icon/smo.png" >\n			</ion-buttons>\n			<p color="light">Actividades SMO</p>\n		</ion-col>\n		<ion-col>\n			<ion-icon name="people" color="light" (click)="navegarPagina(profesores)"></ion-icon>\n			<p color="light">Ponentes</p>\n		</ion-col>\n		<ion-col>\n			<ion-icon name="megaphone" color="light" (click)="navegarPagina(introduccion)"></ion-icon>\n			<p color="light">Mensaje de Bienvenida</p>\n		</ion-col>\n		<ion-col>\n			<ion-icon name="plane" color="light" (click)="abrirWeb(\'http://gruporoyale.net/shop/home.php?lang=1&event=89&zona=1\',\'system\')"></ion-icon>\n			<p color="light">Lugares de interes</p>\n		</ion-col>\n		<ion-col>\n			<ion-icon name="flask" color="light" ></ion-icon>\n			<p color="light">Exposición Comercial</p>\n		</ion-col>\n\n		<ion-col>\n			<ion-icon name="ribbon" color="light" (click)="navegarPagina(patrocinadores)"></ion-icon>\n			<p color="light">Patrocinadores</p>\n		</ion-col>\n\n		<ion-col>\n			<ion-icon name="bus" color="light" (click)="navegarPagina(circuito)"></ion-icon>\n			<p color="light">Circuito de Autobuses</p>\n		</ion-col>\n\n		<ion-col>\n			<ion-icon name="calendar" color="light" (click)="navegarPagina(agenda)"></ion-icon>\n			<p color="light">Mi Agenda</p>\n		</ion-col>\n		<ion-col>\n			<ion-icon name="contacts" color="light" (click)="navegarPagina(congresistas)"></ion-icon>\n			<p color="light">Congresistas</p>\n		</ion-col>\n\n\n\n\n\n\n		<!-- <ion-col>\n			<ion-icon name="cube" color="light" (click)="navegarPagina(votacion)"></ion-icon>\n			<p color="light">Votaciones</p>\n		</ion-col>\n		 -->\n		\n		\n\n\n\n\n		<ion-col  *ngFor="let extra of ajustes.extras" >\n			<ion-icon name="{{extra.icono}}" color="light" (click)="abrirWeb(extra.url, extra.target)"></ion-icon>\n			<p color="light">{{extra.nombre}}</p>\n		</ion-col>\n\n\n	</ion-row>\n\n\n</ion-content>'/*ion-inline-end:"/Users/brb/Desktop/ionic/paoo/src/pages/principal/principal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_3__providers_index_services__["b" /* AjustesProvider */]])
    ], PrincipalPage);
    return PrincipalPage;
}());

//# sourceMappingURL=principal.js.map

/***/ }),

/***/ 543:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificacionesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_index_services__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index_paginas__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NotificacionesPage = /** @class */ (function () {
    function NotificacionesPage(navCtrl, navParams, _ns, _as) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._ns = _ns;
        this._as = _as;
        this.refrescando = false;
        this.scrolling = false;
        this.notificacion = __WEBPACK_IMPORTED_MODULE_3__index_paginas__["h" /* NotificacionPage */];
        this._ns.pagina = 0;
        this._ns.notificaciones = [];
        if (this._as.online) {
            this._ns.cargar_todos();
        }
    }
    NotificacionesPage.prototype.siguiente_pagina = function (infiniteScroll) {
        var _this = this;
        if (this._as.online) {
            this.scrolling = true;
            this._ns.cargar_todos()
                .then(function () {
                infiniteScroll.complete();
                _this.scrolling = false;
            });
        }
        else {
            infiniteScroll.complete();
            this._as.mostrar_toast("No hay conexion a internet");
        }
    };
    NotificacionesPage.prototype.recargar_notificaciones = function (refresher) {
        var _this = this;
        if (this._as.online) {
            this.refrescando = true;
            this._ns.pagina = 0;
            this._ns.notificaciones = [];
            this._ns.cargar_todos()
                .then(function () {
                refresher.complete();
                _this.refrescando = false;
            });
        }
        else {
            refresher.complete();
            this._as.mostrar_toast("No hay conexion a internet");
        }
    };
    NotificacionesPage.prototype.ver_notificacion = function (notificacion) {
        if (this._as.online) {
            this._ns.marcar_visto(notificacion.id);
            this.navCtrl.push(this.notificacion, { 'notificacion': notificacion });
        }
    };
    NotificacionesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-notificaciones',template:/*ion-inline-start:"/Users/brb/Desktop/ionic/paoo/src/pages/notificaciones/notificaciones.html"*/'<ion-header>\n\n	<ion-navbar color="primary">\n		<ion-title >Notificaciones</ion-title>\n	</ion-navbar>\n\n</ion-header>\n\n<ion-content >\n	<ion-refresher [enabled]="!refrescando"  (ionRefresh)="recargar_notificaciones($event)">\n		<ion-refresher-content></ion-refresher-content>\n	</ion-refresher>\n	<ion-list>\n		<ion-item if ion-item *ngFor="let notificacion of _ns.notificaciones" [ngClass]="(!notificacion.visto) ? \'novisto\' : \'\'" (click)="ver_notificacion(notificacion); notificacion.visto=1;" id="{{notificacion.id}}">\n			\n			<h2>{{ notificacion.titulo }}</h2>\n			<p>{{ notificacion.mensaje }}</p>\n			<ion-note item-end>{{ notificacion.time }}</ion-note>\n		</ion-item>\n\n	</ion-list>\n	<ion-infinite-scroll (ionInfinite)="siguiente_pagina($event)">\n		<ion-infinite-scroll-content></ion-infinite-scroll-content>\n	</ion-infinite-scroll>\n</ion-content>\n\n\n\n'/*ion-inline-end:"/Users/brb/Desktop/ionic/paoo/src/pages/notificaciones/notificaciones.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_index_services__["e" /* NotificacionesProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_index_services__["b" /* AjustesProvider */]])
    ], NotificacionesPage);
    return NotificacionesPage;
}());

//# sourceMappingURL=notificaciones.js.map

/***/ }),

/***/ 544:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfesoresPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_paginas__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_index_services__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProfesoresPage = /** @class */ (function () {
    function ProfesoresPage(navCtrl, navParams, menuCtrl, _ps, _as, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this._ps = _ps;
        this._as = _as;
        this.loadingCtrl = loadingCtrl;
        this.refrescando = false;
        this.scrolling = false;
        this.detallesprofesor = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["o" /* ProfesordetallePage */];
        this.nombrePais = "";
        this.searchQuery = '';
        this.pais = this.navParams.get('pais');
        this.nombrePais = this.navParams.get('nombrePais');
        this._ps.pagina = 0;
        this._ps.profesores = [];
        if (this._as.online) {
            var loader_1 = this.loadingCtrl.create({
                content: "Cargando...",
            });
            loader_1.present();
            this._ps.cargar_todos(this.pais)
                .then(function () {
                loader_1.dismiss();
            });
        }
    }
    ProfesoresPage.prototype.mostrar_menu = function () {
        this.menuCtrl.toggle();
    };
    ProfesoresPage.prototype.siguiente_pagina = function (infiniteScroll) {
        var _this = this;
        if (this._as.online) {
            this.scrolling = true;
            this._ps.cargar_todos(this.pais)
                .then(function () {
                infiniteScroll.complete();
                _this.scrolling = false;
            });
        }
        else {
            infiniteScroll.complete();
            this._as.mostrar_toast("No hay conexion a internet");
        }
    };
    ProfesoresPage.prototype.recargar_profesores = function (refresher) {
        var _this = this;
        if (this._as.online) {
            this.refrescando = true;
            this._ps.pagina = 0;
            this._ps.profesores = [];
            this._ps.cargar_todos(this.pais)
                .then(function () {
                refresher.complete();
                _this.refrescando = false;
            });
        }
        else {
            refresher.complete();
            this._as.mostrar_toast("No hay conexion a internet");
        }
    };
    ProfesoresPage.prototype.ver_detalles = function (profesor) {
        this.navCtrl.push(this.detallesprofesor, { 'profesor': profesor });
    };
    ProfesoresPage.prototype.buscar = function (profesor) {
        var val = profesor.target.value;
        if (this._as.online) {
            this.refrescando = true;
            this._ps.pagina = 0;
            this._ps.profesores = [];
            this._ps.buscar_profesor(val);
        }
        else {
            this._as.mostrar_toast("No hay conexion a internet");
        }
    };
    ProfesoresPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profesores',template:/*ion-inline-start:"/Users/brb/Desktop/ionic/paoo/src/pages/profesores/profesores.html"*/'<ion-header>\n\n	<ion-navbar color="primary">\n		<ion-title >Profesores {{nombrePais}}</ion-title>\n		<ion-buttons>\n			<button ion-button ion-only (click)="mostrar_menu()">\n				<ion-icon name="menu"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n	<ion-searchbar (ionInput)="buscar($event)" placeholder="Buscar"></ion-searchbar>\n</ion-header>\n\n<ion-content padding>\n	<ion-refresher [enabled]="!refrescando"  (ionRefresh)="recargar_profesores($event)">\n		<ion-refresher-content></ion-refresher-content>\n	</ion-refresher>\n	<ion-list>\n		<button ion-item *ngFor="let profesor of _ps.profesores" (click)="ver_detalles(profesor)">\n			<ion-avatar item-start>\n				<img src="{{ profesor.foto }}">\n			</ion-avatar>\n			<h2>{{ profesor.nombre }}</h2>\n			<p>{{ profesor.puesto }}</p>\n			\n		</button>\n	</ion-list>\n	<ion-infinite-scroll (ionInfinite)="siguiente_pagina($event)">\n		<ion-infinite-scroll-content></ion-infinite-scroll-content>\n	</ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/Users/brb/Desktop/ionic/paoo/src/pages/profesores/profesores.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_index_services__["h" /* ProfesoresProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_index_services__["b" /* AjustesProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], ProfesoresPage);
    return ProfesoresPage;
}());

//# sourceMappingURL=profesores.js.map

/***/ }),

/***/ 545:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComitePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_index_services__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ComitePage = /** @class */ (function () {
    function ComitePage(navCtrl, navParams, menuCtrl, _cs, _as) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this._cs = _cs;
        this._as = _as;
        this.refrescando = false;
        this.scrolling = false;
        if (this._as.online) {
            this._cs.cargar_todos();
        }
    }
    ComitePage.prototype.mostrar_menu = function () {
        this.menuCtrl.toggle();
    };
    ComitePage.prototype.siguiente_pagina = function (infiniteScroll) {
        var _this = this;
        if (this._as.online) {
            this.scrolling = true;
            this._cs.cargar_todos()
                .then(function () {
                infiniteScroll.complete();
                _this.scrolling = false;
            });
        }
        else {
            infiniteScroll.complete();
            this._as.mostrar_toast("No hay conexion a internet");
        }
    };
    ComitePage.prototype.recargar_comites = function (refresher) {
        var _this = this;
        if (this._as.online) {
            this.refrescando = true;
            this._cs.pagina = 0;
            this._cs.comites = [];
            this._cs.cargar_todos()
                .then(function () {
                refresher.complete();
                _this.refrescando = false;
            });
        }
        else {
            refresher.complete();
            this._as.mostrar_toast("No hay conexion a internet");
        }
    };
    ComitePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-comite',template:/*ion-inline-start:"/Users/brb/Desktop/ionic/paoo/src/pages/comite/comite.html"*/'<ion-header>\n\n	<ion-navbar color="primary">\n		<ion-title >Comité Organizador</ion-title>\n		<ion-buttons>\n			<button ion-button ion-only (click)="mostrar_menu()">\n				<ion-icon name="menu"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n	<ion-refresher [enabled]="!refrescando"  (ionRefresh)="recargar_comites($event)">\n		<ion-refresher-content></ion-refresher-content>\n	</ion-refresher>\n	<ion-list>\n		<li class="item" ion-item *ngFor="let comite of _cs.comites" padding style="border-left-color: #E8B46B;\n		border-left-width: 10px;\n		border-left-style: solid;" >\n\n		<h2 style="color: #002549">{{ comite.nombre }}</h2>\n		<p style="color: #E8B46B">{{ comite.puesto }}</p>\n	</li>\n\n</ion-list>\n<ion-infinite-scroll (ionInfinite)="siguiente_pagina($event)">\n	<ion-infinite-scroll-content></ion-infinite-scroll-content>\n</ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/Users/brb/Desktop/ionic/paoo/src/pages/comite/comite.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_index_services__["c" /* ComitesProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_index_services__["b" /* AjustesProvider */]])
    ], ComitePage);
    return ComitePage;
}());

//# sourceMappingURL=comite.js.map

/***/ }),

/***/ 546:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaisesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_index_services__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index_paginas__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PaisesPage = /** @class */ (function () {
    function PaisesPage(navCtrl, navParams, menuCtrl, _ps, _as) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this._ps = _ps;
        this._as = _as;
        this.refrescando = false;
        this.scrolling = false;
        this.profesores = __WEBPACK_IMPORTED_MODULE_3__index_paginas__["p" /* ProfesoresPage */];
        if (this._as.online) {
            this._ps.cargar_todos();
        }
    }
    PaisesPage.prototype.mostrar_menu = function () {
        this.menuCtrl.toggle();
    };
    PaisesPage.prototype.siguiente_pagina = function (infiniteScroll) {
        var _this = this;
        if (this._as.online) {
            this.scrolling = true;
            this._ps.cargar_todos()
                .then(function () {
                infiniteScroll.complete();
                _this.scrolling = false;
            });
        }
        else {
            infiniteScroll.complete();
            this._as.mostrar_toast("No hay conexion a internet");
        }
    };
    PaisesPage.prototype.recargar_paises = function (refresher) {
        var _this = this;
        if (this._as.online) {
            this.refrescando = true;
            this._ps.pagina = 0;
            this._ps.paises = [];
            this._ps.cargar_todos()
                .then(function () {
                refresher.complete();
                _this.refrescando = false;
            });
        }
        else {
            refresher.complete();
            this._as.mostrar_toast("No hay conexion a internet");
        }
    };
    PaisesPage.prototype.verProfesoresPais = function (pais) {
        this.navCtrl.push(this.profesores, { 'pais': pais.id, 'nombrePais': pais.pais });
    };
    PaisesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-paises',template:/*ion-inline-start:"/Users/brb/Desktop/ionic/paoo/src/pages/paises/paises.html"*/'<ion-header>\n\n	<ion-navbar color="primary">\n		<ion-title >Paises</ion-title>\n		<ion-buttons>\n			<button ion-button ion-only (click)="mostrar_menu()">\n				<ion-icon name="menu"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n	<ion-refresher [enabled]="!refrescando"  (ionRefresh)="recargar_paises($event)">\n		<ion-refresher-content></ion-refresher-content>\n	</ion-refresher>\n	<ion-card ion-item *ngFor="let pais of _ps.paises">\n		<ion-card-content>\n			<ion-row>\n				<ion-col>\n					<img src="{{pais.logo}}"  />\n				</ion-col>\n				<ion-col>\n					<h3 color="primary" text-center><b>{{pais.pais}}</b></h3>\n					<button ion-button color="secondary" (click)="verProfesoresPais(pais)">Ver profesores</button>\n				</ion-col>\n			</ion-row>\n\n		</ion-card-content>\n\n\n	</ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/brb/Desktop/ionic/paoo/src/pages/paises/paises.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_index_services__["f" /* PaisesProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_index_services__["b" /* AjustesProvider */]])
    ], PaisesPage);
    return PaisesPage;
}());

//# sourceMappingURL=paises.js.map

/***/ }),

/***/ 547:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MinutoxminutoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_index_services__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index_paginas__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MinutoxminutoPage = /** @class */ (function () {
    function MinutoxminutoPage(navCtrl, navParams, menuCtrl, _ac, _as) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this._ac = _ac;
        this._as = _as;
        this.refrescando = false;
        this.scrolling = false;
        this.actividad = __WEBPACK_IMPORTED_MODULE_3__index_paginas__["b" /* ActividadPage */];
        if (this._as.online) {
            this._ac.cargar_todos()
                .then(function () {
                _this.diaactual = _this._ac.diaactual;
            });
            this.diaactual = this._ac.diaactual;
        }
    }
    MinutoxminutoPage.prototype.mostrar_menu = function () {
        this.menuCtrl.toggle();
    };
    MinutoxminutoPage.prototype.recargar_actividades = function (refresher) {
        var _this = this;
        if (this._as.online) {
            this.refrescando = true;
            this._ac.dias = [];
            this._ac.cargar_todos()
                .then(function () {
                refresher.complete();
                _this.refrescando = false;
                _this.diaactual = _this._ac.diaactual;
            });
        }
        else {
            refresher.complete();
            this._as.mostrar_toast("No hay conexion a internet");
        }
    };
    MinutoxminutoPage.prototype.ver_detalles = function (actividad) {
        this.navCtrl.push(this.actividad, { 'actividad': actividad });
    };
    MinutoxminutoPage.prototype.buscar = function (profesor) {
        var val = profesor.target.value;
        if (this._as.online) {
            this.refrescando = true;
            this._ac.dias = [];
            this._ac.buscar_actividad(val);
        }
        else {
            this._as.mostrar_toast("No hay conexion a internet");
        }
    };
    MinutoxminutoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-minutoxminuto',template:/*ion-inline-start:"/Users/brb/Desktop/ionic/paoo/src/pages/minutoxminuto/minutoxminuto.html"*/'<ion-header>\n\n	<ion-navbar color="primary">\n		<ion-title >Programa General</ion-title>\n		<ion-buttons>\n			<button ion-button ion-only (click)="mostrar_menu()">\n				<ion-icon name="menu"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n	<ion-toolbar >\n		\n		<ion-segment [(ngModel)]="diaactual" color="secondary">\n			<ion-segment-button value="16">Sab/25\n			</ion-segment-button>\n			<ion-segment-button value="17">Dom/26\n			</ion-segment-button>\n			<ion-segment-button value="18">Lun/27\n			</ion-segment-button>\n			<ion-segment-button value="19">Mar/28\n			</ion-segment-button>\n		</ion-segment>\n	</ion-toolbar>\n	<ion-searchbar (ionInput)="buscar($event)" placeholder="Buscar"></ion-searchbar>\n</ion-header>\n\n<ion-content padding>\n\n	<div [ngSwitch]="diaactual">\n		<ng-container *ngFor="let dia of _ac.dias">\n			<div *ngSwitchCase="dia.clave_dia">\n				\n				<ion-list-header>\n					{{ dia.dia }}\n				</ion-list-header>\n				<button ion-item *ngFor="let actividad of dia.actividades" (click)="ver_detalles(actividad)">\n\n\n					<h2>{{actividad.actividad}}</h2>\n					<p><ion-icon name="clock" color="primary"></ion-icon> {{actividad.horario}} <ion-icon name="pin" color="danger"></ion-icon> {{actividad.salon}}</p>\n\n				</button>\n			</div>\n		</ng-container>\n	</div>\n\n\n\n\n\n	<ion-refresher [enabled]="!refrescando"  (ionRefresh)="recargar_actividades($event)">\n		<ion-refresher-content></ion-refresher-content>\n	</ion-refresher>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/brb/Desktop/ionic/paoo/src/pages/minutoxminuto/minutoxminuto.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_index_services__["a" /* ActividadesProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_index_services__["b" /* AjustesProvider */]])
    ], MinutoxminutoPage);
    return MinutoxminutoPage;
}());

//# sourceMappingURL=minutoxminuto.js.map

/***/ }),

/***/ 548:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LugaresPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_index_services__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LugaresPage = /** @class */ (function () {
    function LugaresPage(navCtrl, navParams, menuCtrl, _ls, _as, viewCtrl, miubicacion) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this._ls = _ls;
        this._as = _as;
        this.viewCtrl = viewCtrl;
        this.miubicacion = miubicacion;
        if (this._as.online) {
            this._ls.cargar_todos();
        }
        this.title = 'Puerto Vallarta';
        this.lat = 20.6262325;
        this.lng = -105.2333715;
    }
    LugaresPage.prototype.mostrar_menu = function () {
        this.menuCtrl.toggle();
    };
    LugaresPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-lugares',template:/*ion-inline-start:"/Users/brb/Desktop/ionic/paoo/src/pages/lugares/lugares.html"*/'<ion-content >\n\n\n\n	<agm-map [latitude]="lat" [longitude]="lng" [zoom]="12" >\n\n		<agm-marker *ngIf="miubicacion.compartiendo" [latitude]="miubicacion.latitud" [longitude]="miubicacion.longitud" >\n			<agm-info-window>\n				<p>\n				Mi ubicación</p>\n			</agm-info-window>\n		</agm-marker>\n\n		<agm-marker *ngFor="let ubicacion of _ls.lugares"  [latitude]="ubicacion.latitud" [longitude]="ubicacion.longitud" >\n			<agm-info-window>\n				<p>\n				{{ubicacion.ubicacion}}</p>\n			</agm-info-window>\n		</agm-marker>\n\n	</agm-map>\n\n\n</ion-content>\n<ion-footer>\n	<ion-toolbar color="primary">\n		<ion-buttons end>\n			<button ion-button (click)="viewCtrl.dismiss(false)">\n				<span ion-text color="light" showWhen="ios">Cerrar</span>\n				<ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-toolbar>\n</ion-footer>\n\n\n'/*ion-inline-end:"/Users/brb/Desktop/ionic/paoo/src/pages/lugares/lugares.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_index_services__["d" /* LugaresProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_index_services__["b" /* AjustesProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_index_services__["i" /* UbicacionProvider */]])
    ], LugaresPage);
    return LugaresPage;
}());

//# sourceMappingURL=lugares.js.map

/***/ }),

/***/ 549:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfesordetallePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_index_services__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index_paginas__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProfesordetallePage = /** @class */ (function () {
    function ProfesordetallePage(navCtrl, navParams, act) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.act = act;
        this.profesor = {};
        this.textHTML = "";
        this.tieneCurriculum = false;
        this.tipo = "act";
        this.actividad = __WEBPACK_IMPORTED_MODULE_3__index_paginas__["b" /* ActividadPage */];
        this.profesor = this.navParams.get("profesor");
        this.textHTML = this.profesor.curriculum;
        if (this.profesor.curriculum != "") {
            this.tieneCurriculum = true;
        }
        this.act.diasprofesor = [];
        this.act.cargar_por_profesor(this.profesor.id)
            .then(function () {
        });
    }
    ProfesordetallePage.prototype.ver_detalles = function (actividad) {
        this.navCtrl.push(this.actividad, { 'actividad': actividad });
    };
    ProfesordetallePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profesordetalle',template:/*ion-inline-start:"/Users/brb/Desktop/ionic/paoo/src/pages/profesordetalle/profesordetalle.html"*/'<ion-header>\n\n	<ion-navbar color="primary">\n		<ion-title>Detalles</ion-title>\n	</ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding  >\n	<ion-avatar text-center>\n		<img ion-img src="{{profesor.foto}}"/>\n	</ion-avatar>\n	<ion-card-content class="info">\n		<ion-card-title text-center color="primary">\n			{{profesor.nombre}}\n			<hr>\n		</ion-card-title>\n		\n		<ion-row>\n			<ion-col  col-9>\n				<p text-left >\n					{{profesor.puesto}}\n				</p>\n			</ion-col>\n			<ion-col  col-3 text-center>\n				<img src="{{profesor.bandera}}"   >\n				<label>{{profesor.pais}}</label>\n			</ion-col>\n		</ion-row>\n	</ion-card-content>\n\n\n\n\n\n\n\n	<ion-segment [(ngModel)]="tipo">\n		<ion-segment-button value="act">\n			Actividades\n		</ion-segment-button>\n		<ion-segment-button value="curr">\n			Curriculum\n		</ion-segment-button>\n		\n	</ion-segment>\n\n\n	<div [ngSwitch]="tipo">\n		<ion-list *ngSwitchCase="\'curr\'">\n			<ion-card-content [hidden]="!tieneCurriculum" >\n				<p [innerHTML]="textHTML"></p>\n			</ion-card-content>	\n		</ion-list>\n\n		<ion-list *ngSwitchCase="\'act\'">\n			<ion-card-content >\n				<ion-list *ngFor="let dia of act.diasprofesor">\n					<ion-list-header>{{ dia.dia }}</ion-list-header>\n					<button ion-item  *ngFor="let actividad of dia.actividades" (click)="ver_detalles(actividad)">\n						<h2>{{actividad.actividad}}</h2>\n						<p><ion-icon name="clock" color="primary"></ion-icon> {{actividad.horario}} <ion-icon name="pin" color="danger"></ion-icon> {{actividad.salon}}</p>\n					</button>\n					\n				</ion-list>\n\n\n			</ion-card-content>	\n		</ion-list>\n\n	</div>\n\n\n\n\n\n\n</ion-content>\n\n\n'/*ion-inline-end:"/Users/brb/Desktop/ionic/paoo/src/pages/profesordetalle/profesordetalle.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_index_services__["a" /* ActividadesProvider */]])
    ], ProfesordetallePage);
    return ProfesordetallePage;
}());

//# sourceMappingURL=profesordetalle.js.map

/***/ }),

/***/ 550:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PatrocinadoresPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_paginas__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_index_services__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PatrocinadoresPage = /** @class */ (function () {
    function PatrocinadoresPage(navCtrl, navParams, menuCtrl, _ps, _as) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this._ps = _ps;
        this._as = _as;
        this.refrescando = false;
        this.scrolling = false;
        this.detallespatrocinador = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["k" /* PatrocinadorPage */];
        if (this._as.online) {
            this._ps.cargar_todos();
        }
    }
    PatrocinadoresPage.prototype.mostrar_menu = function () {
        this.menuCtrl.toggle();
    };
    PatrocinadoresPage.prototype.siguiente_pagina = function (infiniteScroll) {
        var _this = this;
        if (this._as.online) {
            this.scrolling = true;
            this._ps.cargar_todos()
                .then(function () {
                infiniteScroll.complete();
                _this.scrolling = false;
            });
        }
        else {
            infiniteScroll.complete();
            this._as.mostrar_toast("No hay conexion a internet");
        }
    };
    PatrocinadoresPage.prototype.recargar_patrocinadores = function (refresher) {
        var _this = this;
        if (this._as.online) {
            this.refrescando = true;
            this._ps.pagina = 0;
            this._ps.patrocinadores = [];
            this._ps.cargar_todos()
                .then(function () {
                refresher.complete();
                _this.refrescando = false;
            });
        }
        else {
            refresher.complete();
            this._as.mostrar_toast("No hay conexion a internet");
        }
    };
    PatrocinadoresPage.prototype.ver_detalles = function (patrocinador) {
        this.navCtrl.push(this.detallespatrocinador, { 'patrocinador': patrocinador });
    };
    PatrocinadoresPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-patrocinadores',template:/*ion-inline-start:"/Users/brb/Desktop/ionic/paoo/src/pages/patrocinadores/patrocinadores.html"*/'<ion-header>\n\n	<ion-navbar color="primary">\n		<ion-title >Patrocinadores</ion-title>\n		<ion-buttons>\n			<button ion-button ion-only (click)="mostrar_menu()">\n				<ion-icon name="menu"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n	<ion-refresher [enabled]="!refrescando"  (ionRefresh)="recargar_patrocinadores($event)">\n		<ion-refresher-content></ion-refresher-content>\n	</ion-refresher>\n	<ion-list>\n		<button ion-item *ngFor="let patrocinador of _ps.patrocinadores" (click)="ver_detalles(patrocinador)">\n			\n			<ion-thumbnail item-start>\n				<img src="{{ patrocinador.logo }}">\n			</ion-thumbnail>\n			<h2>{{ patrocinador.patrocinador }}</h2>\n			\n\n			\n		</button>\n		\n	</ion-list>\n	<ion-infinite-scroll (ionInfinite)="siguiente_pagina($event)">\n		<ion-infinite-scroll-content></ion-infinite-scroll-content>\n	</ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/Users/brb/Desktop/ionic/paoo/src/pages/patrocinadores/patrocinadores.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_index_services__["g" /* PatrocinadoresProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_index_services__["b" /* AjustesProvider */]])
    ], PatrocinadoresPage);
    return PatrocinadoresPage;
}());

//# sourceMappingURL=patrocinadores.js.map

/***/ }),

/***/ 551:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PatrocinadorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__ = __webpack_require__(170);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PatrocinadorPage = /** @class */ (function () {
    function PatrocinadorPage(iab, navCtrl, navParams) {
        this.iab = iab;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.patrocinador = {};
        this.textHTML = "";
        this.patrocinador = this.navParams.get("patrocinador");
        this.textHTML = this.patrocinador.descripcion;
    }
    PatrocinadorPage.prototype.visitar_pagina = function (url) {
        if (url === void 0) { url = ""; }
        if (url != "") {
            this.iab.create(url, "_system");
        }
    };
    PatrocinadorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-patrocinador',template:/*ion-inline-start:"/Users/brb/Desktop/ionic/paoo/src/pages/patrocinador/patrocinador.html"*/'<ion-header>\n\n	<ion-navbar color="primary">\n		<ion-title>Patrocinador</ion-title>\n	</ion-navbar>\n\n</ion-header>\n\n\n<ion-content   >\n\n\n\n	<ion-card>\n		<img src="{{patrocinador.logo}}"/>\n		<ion-card-content>\n			<ion-card-title>\n				{{patrocinador.patrocinador}}\n			</ion-card-title>\n			<p [innerHTML]="textHTML"></p>\n		</ion-card-content>\n		<ion-row>\n			<ion-col>\n				<button ion-button color="primary" clear small icon-start (click)="visitar_pagina(patrocinador.pagina)">\n					<ion-icon name=\'link\'></ion-icon>\n					{{patrocinador.pagina}}\n				</button>\n			</ion-col>\n		</ion-row>\n\n	</ion-card>\n\n\n\n\n\n\n\n</ion-content>\n\n\n'/*ion-inline-end:"/Users/brb/Desktop/ionic/paoo/src/pages/patrocinador/patrocinador.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], PatrocinadorPage);
    return PatrocinadorPage;
}());

//# sourceMappingURL=patrocinador.js.map

/***/ }),

/***/ 552:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroduccionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_tabs__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_ajustes_ajustes__ = __webpack_require__(85);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var IntroduccionPage = /** @class */ (function () {
    function IntroduccionPage(navCtrl, navParams, ajustes, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ajustes = ajustes;
        this.viewCtrl = viewCtrl;
        this.slides = [
            {
                title: "Mensaje de la presidenta",
                description: "Me complace que haya llegado el momento de celebrar nuestro tradicional Congreso de Radioterapia, en el que colegas  y  familiares  compartimos por 4 días los retos, logros y oportunidades en el amplio campo de la radioterapia.",
                image: "assets/img/FotoPresidenta.png",
                fin: false,
            },
            {
                title: "",
                description: "El comité organizador ha pensado con cuidado y por varios meses el contenido del programa académico que aquí presentamos, en el cual incluimos a reconocidos expertos de México y el mundo que expondrán los temas que consideramos más relevantes y de vanguardia a nivel global para mejorar los tratamientos, y continuar con el desarrollo académico de nuestra disciplina. Entre los rubros a destacar, contaremos con hipofraccionamiento en mama, recto, próstata, así como los avances que presenta la inmunoterapia y resultados de estudios en cáncer de cabeza y cuello. Además del taller de contorneo y de los programas de Física Médica y de los jóvenes.",
                image: "assets/img/FotoPresidenta.png",
                fin: false,
            },
            {
                title: "",
                description: "Quiero agradecer a todos los miembros de SOMERA, a la mesa directiva, al comité organizador, expositores, académicos, al total de la sociedad médica y a la industria, sin la cual también sería imposible tener este evento. Espero que disfrutemos estos días en el entorno de las bellas playas de Puerto Vallarta.",
                image: "assets/img/FotoPresidenta.png",
                fin: true,
            }
        ];
    }
    IntroduccionPage.prototype.saltar_tutorial = function () {
        if (this.ajustes.ajustes.mostrar_introduccion == true) {
            this.ajustes.ajustes.mostrar_introduccion = false;
            //this.ajustes.guardar_storage();
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */]);
        }
        else {
            this.viewCtrl.dismiss();
        }
    };
    IntroduccionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-introduccion',template:/*ion-inline-start:"/Users/brb/Desktop/ionic/paoo/src/pages/introduccion/introduccion.html"*/'<ion-header>\n	<ion-navbar color="primary">\n		<ion-buttons end>\n			<button ion-button (click)="saltar_tutorial()">\n				<span ion-text color="light" showWhen="ios">Cerrar</span>\n				<ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title >PAOO - XXXIV Congreso Panamericano de Oftalmología</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content class="icons-basic-page center" >\n	<!-- <img src="assets/img/patrocinio.png" style="height:100%"/> -->\n	<button ion-button  icon-end color="primary"  style="position: fixed; left: 0;   bottom: 4em; right: 0" (click)="saltar_tutorial()">\n		Continuar\n		<ion-icon name="arrow-forward"></ion-icon>\n	</button>\n</ion-content>\n<!-- <ion-content class="tutorial-page">\n\n	<ion-slides pager>\n		<ion-slide *ngFor="let slide of slides">\n			<img [src]="slide.image" style="width: 100%;  opacity: 0;" />\n			<h2 class="slide-title"  [innerHTML]="slide.title"></h2>\n			<p [innerHTML]="slide.description"></p>\n			<h2 *ngIf="slide.fin" style="text-align: center;">Dra. Adela Poitevin Chacón</h2>\n			<p *ngIf="slide.fin" style="text-align: center;">Presidenta</p>\n			<button ion-button large clear icon-end color="primary" *ngIf="slide.fin" (click)="saltar_tutorial()">\n				Continuar\n				<ion-icon name="arrow-forward"></ion-icon>\n			</button>\n		</ion-slide>\n	</ion-slides>\n</ion-content> -->'/*ion-inline-end:"/Users/brb/Desktop/ionic/paoo/src/pages/introduccion/introduccion.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_ajustes_ajustes__["a" /* AjustesProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */]])
    ], IntroduccionPage);
    return IntroduccionPage;
}());

//# sourceMappingURL=introduccion.js.map

/***/ }),

/***/ 553:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificacionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NotificacionPage = /** @class */ (function () {
    function NotificacionPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.notificacion = {};
        this.textHTML = "";
        this.notificacion = this.navParams.get("notificacion");
    }
    NotificacionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-notificacion',template:/*ion-inline-start:"/Users/brb/Desktop/ionic/paoo/src/pages/notificacion/notificacion.html"*/'<ion-header>\n\n	<ion-navbar color="primary">\n		<ion-title>Detalles</ion-title>\n	</ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding  >\n	<ion-card-content class="info">\n		<ion-card-title text-center color="primary">\n			<h2>{{notificacion.titulo}}</h2>\n			<hr>\n			<p>{{notificacion.mensaje}}</p>\n			\n		</ion-card-title><ion-note item-start>{{ notificacion.time }}</ion-note>\n		\n\n	</ion-card-content>\n\n\n\n\n</ion-content>\n\n\n'/*ion-inline-end:"/Users/brb/Desktop/ionic/paoo/src/pages/notificacion/notificacion.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], NotificacionPage);
    return NotificacionPage;
}());

//# sourceMappingURL=notificacion.js.map

/***/ }),

/***/ 554:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VotacionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_index_services__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var VotacionPage = /** @class */ (function () {
    function VotacionPage(navCtrl, navParams, menuCtrl, _vs, _as, _us, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this._vs = _vs;
        this._as = _as;
        this._us = _us;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.refrescando = false;
        this.scrolling = false;
        if (this._us.si_sesion_iniciada()) {
            if (this._as.online) {
                this._vs.opciones = [];
                this._vs.cargar_pregunta();
            }
        }
        else {
            this._vs.mensaje = "Para participar en las votaciones inicia sesión";
        }
        this.seleccionada = false;
    }
    VotacionPage.prototype.mostrar_menu = function () {
        this.menuCtrl.toggle();
    };
    VotacionPage.prototype.recargar_votacion = function (refresher) {
        var _this = this;
        if (this._us.si_sesion_iniciada()) {
            if (this._as.online) {
                this.refrescando = true;
                this._vs.opcion_seleccionada = "0";
                this._vs.opciones = [];
                this.seleccionada = false;
                this._vs.cargar_pregunta()
                    .then(function () {
                    refresher.complete();
                    _this.refrescando = false;
                });
            }
            else {
                refresher.complete();
                this._as.mostrar_toast("No hay conexion a internet");
            }
        }
        else {
            refresher.complete();
            this.refrescando = false;
            this._vs.mensaje = "Para participar en las votaciones inicia sesión";
        }
    };
    VotacionPage.prototype.seleccionar_opcion = function (opcion) {
        this.seleccionada = true;
        this._vs.opcion_seleccionada = opcion;
    };
    VotacionPage.prototype.enviar_respuesta = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirme su respuesta',
            message: 'Está seguro de enviar su respuesta?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Seguro',
                    handler: function () {
                        var loader = _this.loadingCtrl.create({
                            content: "Enviando respuesta...",
                        });
                        loader.present();
                        _this._vs.enviar_respuesta(_this._vs.pregunta_id, _this._vs.opcion_seleccionada, _this._us.id_usuario).subscribe(function () {
                            loader.dismiss();
                            _this.seleccionada = false;
                            _this._vs.opcion_seleccionada = "0";
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    VotacionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-votacion',template:/*ion-inline-start:"/Users/brb/Desktop/ionic/paoo/src/pages/votacion/votacion.html"*/'<ion-header>\n\n	<ion-navbar color="primary">\n		<ion-title >Votaciones</ion-title>\n		<ion-buttons>\n			<button ion-button ion-only (click)="mostrar_menu()">\n				<ion-icon name="menu"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n	<ion-refresher [enabled]="!refrescando"  (ionRefresh)="recargar_votacion($event)">\n		<ion-refresher-content></ion-refresher-content>\n	</ion-refresher>\n\n	\n	<h3 *ngIf="!_vs.error" color="primary">{{_vs.pregunta}}</h3>\n	<p >{{_vs.mensaje}}</p>\n	<ion-list *ngIf="!_vs.error" radio-group>\n\n		<ion-item *ngFor="let opcion of _vs.opciones">\n			<ion-label>{{ opcion.opcion }}</ion-label>\n			<ion-radio checked="{{ opcion.seleccionado }}" value="{{ opcion.id }}" disabled="false" color="secondary" (ionSelect)="seleccionar_opcion(opcion.id)"></ion-radio>\n		</ion-item>\n\n	</ion-list>\n	<button *ngIf="!_vs.error && seleccionada && !_vs.contestada"   ion-button block color="secondary" (click)="enviar_respuesta();">Enviar respuesta</button>\n	<h3 *ngIf="_vs.error" text-center>\n		<br><br>\n		Desplaza hacia abajo para actualizar\n		<br>\n		<ion-icon name="arrow-down"></ion-icon>\n	</h3>\n\n</ion-content>\n'/*ion-inline-end:"/Users/brb/Desktop/ionic/paoo/src/pages/votacion/votacion.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_index_services__["k" /* VotacionProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_index_services__["b" /* AjustesProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_index_services__["j" /* UsuarioProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], VotacionPage);
    return VotacionPage;
}());

//# sourceMappingURL=votacion.js.map

/***/ }),

/***/ 555:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActividadPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_index_services__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ActividadPage = /** @class */ (function () {
    function ActividadPage(navCtrl, navParams, _ac, _as, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._ac = _ac;
        this._as = _as;
        this.loadingCtrl = loadingCtrl;
        this.actividad = {};
        this.textHTML = "";
        this.actividad = this.navParams.get("actividad");
        if (this._as.online) {
            var loader_1 = this.loadingCtrl.create({
                content: "Cargando...",
            });
            loader_1.present();
            this._ac.cargar_actividad(this.actividad.id)
                .then(function () {
                console.log("Consultado: ", _this._ac.actividad);
                _this.actividad = _this._ac.actividad;
                loader_1.dismiss();
            });
        }
    }
    ActividadPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-actividad',template:/*ion-inline-start:"/Users/brb/Desktop/ionic/paoo/src/pages/actividad/actividad.html"*/'<ion-header>\n\n	<ion-navbar color="primary">\n		<ion-title>Detalles</ion-title>\n	</ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding  >\n	\n	<h3>\n		{{actividad.actividad}}\n	</h3>\n	<hr>\n	<p>\n		<ion-icon color="primary" name="clock"></ion-icon> {{actividad.horario}}\n	</p>\n	<hr>\n	<p  > <ion-icon color="secondary" name="people"></ion-icon> Profesores / coordinadores: <b>{{actividad.profesores}}</b></p>\n	\n	<p>\n		<ion-icon name="pin" color="danger"></ion-icon> {{actividad.sede}}\n	</p>\n	<hr>\n	<p>Descripcion:</p>\n	<p [innerHTML]="actividad.descripcion"></p>\n<!-- 	<ion-avatar text-center>\n		<img ion-img src="{{profesor.foto}}"/>\n	</ion-avatar>\n	<ion-card-content class="info">\n		<ion-card-title text-center color="primary">\n			{{profesor.nombre}}\n			<hr>\n		</ion-card-title>\n		\n		<ion-row>\n			<ion-col  col-9>\n				<p text-left >\n					{{profesor.puesto}}\n				</p>\n			</ion-col>\n			<ion-col  col-3 text-center>\n				<img src="{{profesor.bandera}}"   >\n				<label>{{profesor.pais}}</label>\n			</ion-col>\n		</ion-row>\n	</ion-card-content>\n\n-->\n\n\n\n\n\n\n\n</ion-content>\n\n\n'/*ion-inline-end:"/Users/brb/Desktop/ionic/paoo/src/pages/actividad/actividad.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_index_services__["a" /* ActividadesProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_index_services__["b" /* AjustesProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], ActividadPage);
    return ActividadPage;
}());

//# sourceMappingURL=actividad.js.map

/***/ }),

/***/ 652:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_ajustes_ajustes__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_notificaciones_notificaciones__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_device__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, menuCtrl, ajustes, push, device, modalCtrl) {
        var _this = this;
        this.menuCtrl = menuCtrl;
        this.ajustes = ajustes;
        this.push = push;
        this.device = device;
        this.modalCtrl = modalCtrl;
        this.tabs = __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["s" /* TabsPage */];
        this.principal = __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["n" /* PrincipalPage */];
        this.notificaciones = __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["i" /* NotificacionesPage */];
        this.profesores = __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["p" /* ProfesoresPage */];
        this.comite = __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["c" /* ComitePage */];
        this.salones = __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["r" /* SalonesPage */];
        this.paises = __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["j" /* PaisesPage */];
        this.minutoxminuto = __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["g" /* MinutoxminutoPage */];
        this.lugares = __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["f" /* LugaresPage */];
        this.login = __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["e" /* LoginPage */];
        this.patrocinadores = __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["l" /* PatrocinadoresPage */];
        this.introduccion = __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["d" /* IntroduccionPage */];
        this.acercade = __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["a" /* AcercadePage */];
        platform.ready().then(function () {
            _this.ajustes.cargar_extras();
            _this.ajustes.cargar_storage()
                .then(function () {
                if (_this.ajustes.ajustes.uuid == "XXXXX") {
                    _this.ajustes.ajustes.uuid = _this.device.uuid;
                    _this.ajustes.guardar_storage();
                }
                if (_this.ajustes.ajustes.mostrar_introduccion) {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["d" /* IntroduccionPage */];
                }
                else {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["s" /* TabsPage */];
                }
                // Okay, so the platform is ready and our plugins are available.
                // Here you can do any higher level native things you might need.
                statusBar.styleDefault();
                splashScreen.hide();
                //llamando notificaciones
                _this.push.init_notificaciones();
            });
        });
    }
    MyApp.prototype.abrirPagina = function (pagina) {
        this.rootPage = pagina;
        this.menuCtrl.close();
    };
    MyApp.prototype.abrir_modal = function (pagina) {
        var modal = this.modalCtrl.create(pagina);
        modal.present();
        this.menuCtrl.close();
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/brb/Desktop/ionic/paoo/src/app/app.html"*/'<ion-menu [content]="content">\n\n	<ion-header>\n		<ion-toolbar color="primary">\n			<ion-title>\n				Menú\n			</ion-title>	\n		</ion-toolbar>\n	</ion-header>\n\n	<ion-content>\n		<img src="assets/imgs/banner.jpg"/>\n		<ion-list>\n			<button ion-item (click)="abrirPagina(tabs)">\n				<ion-icon name="home"></ion-icon> Inicio\n			</button>\n			<button ion-item (click)="abrirPagina(minutoxminuto)">\n				<ion-icon name="clock"></ion-icon> Programa académico\n			</button>\n			<button ion-item (click)="abrirPagina(profesores)">\n				<ion-icon name="mic"></ion-icon> Ponentes\n			</button>\n			\n			\n			<button ion-item (click)="abrirPagina(comite)">\n				<ion-icon name="people"></ion-icon> Comité Organizador\n			</button>\n			\n			<button ion-item (click)="abrirPagina(votaciones)">\n				<ion-icon name="cube"></ion-icon> Votaciones\n			</button>\n			<button ion-item (click)="abrirPagina(patrocinadores)">\n				<ion-icon name="bookmark"></ion-icon> Patrocinadores\n			</button>\n			<button ion-item (click)="abrir_modal(introduccion)">\n				<ion-icon name="megaphone"></ion-icon> Mensaje de la Presidenta\n			</button>\n			<button ion-item (click)="abrirPagina(lugares)">\n				<ion-icon name="pin"></ion-icon> Lugares\n			</button>\n\n			<button ion-item (click)="abrirPagina(acercade)">\n				<ion-icon name="information-circle"></ion-icon> Acerca de\n			</button>\n		</ion-list>\n	</ion-content>\n\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content></ion-nav>\n'/*ion-inline-end:"/Users/brb/Desktop/ionic/paoo/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_ajustes_ajustes__["a" /* AjustesProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_notificaciones_notificaciones__["a" /* NotificacionesProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AjustesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_url_servicios__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AjustesProvider = /** @class */ (function () {
    function AjustesProvider(platform, storage, network, toast, http) {
        this.platform = platform;
        this.storage = storage;
        this.network = network;
        this.toast = toast;
        this.http = http;
        this.ajustes = {
            mostrar_introduccion: true,
            uuid: "XXXXX"
        };
        this.online = true;
        this.extras = [];
        this.checkConexion();
    }
    AjustesProvider.prototype.cargar_storage = function () {
        var _this = this;
        var promesa = new Promise(function (resolve, reject) {
            if (_this.platform.is("cordova")) {
                console.log("Inicializando storage");
                _this.storage.ready()
                    .then(function () {
                    console.log("Storage listo");
                    _this.storage.get("ajustes")
                        .then(function (ajustes) {
                        if (ajustes) {
                            _this.ajustes = ajustes;
                        }
                        resolve();
                    });
                });
            }
            else {
                if (localStorage.getItem("ajustes")) {
                    _this.ajustes = JSON.parse(localStorage.getItem("ajustes"));
                }
                resolve();
            }
        });
        return promesa;
    };
    AjustesProvider.prototype.guardar_storage = function () {
        var _this = this;
        if (this.platform.is("cordova")) {
            this.storage.ready()
                .then(function () {
                _this.storage.set("ajustes", _this.ajustes);
            });
        }
        else {
            localStorage.setItem("ajustes", JSON.stringify(this.ajustes));
        }
    };
    AjustesProvider.prototype.checkConexion = function () {
        var _this = this;
        console.log("Revisando");
        if (this.platform.is('cordova')) {
            if (this.network.type === undefined || this.network.type === null || this.network.type === 'unknown') {
                this.online = false;
                console.log('No hay conexion a internet');
            }
            else {
                this.online = true;
                console.log('Si hay conexion a internet');
            }
        }
        else {
            this.online = navigator.onLine;
            console.log('Si hay conexion a internet');
        }
        var disconnectSubscription = this.network.onDisconnect().subscribe(function () {
            console.log('No hay conexion a internet');
            _this.online = false;
        });
        var connectSubscription = this.network.onConnect().subscribe(function () {
            console.log('network connected!');
            _this.online = true;
        });
    };
    AjustesProvider.prototype.mostrar_toast = function (mensaje) {
        this.toast.show(mensaje, '5000', 'center').subscribe(function (toast) {
            console.log(toast);
        });
    };
    AjustesProvider.prototype.cargar_extras = function () {
        var _this = this;
        var promesa = new Promise(function (resolve, reject) {
            var url = __WEBPACK_IMPORTED_MODULE_5__config_url_servicios__["a" /* URL_SERVICIOS */] + "/extras.php";
            _this.http.get(url)
                .map(function (resp) { return resp.json(); })
                .subscribe(function (data) {
                var _a;
                if (data.error) {
                }
                else {
                    (_a = _this.extras).push.apply(_a, data.extras);
                }
                resolve();
            });
        });
        return promesa;
    };
    AjustesProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__["a" /* Toast */],
            __WEBPACK_IMPORTED_MODULE_6__angular_http__["a" /* Http */]])
    ], AjustesProvider);
    return AjustesProvider;
}());

//# sourceMappingURL=ajustes.js.map

/***/ })

},[395]);
//# sourceMappingURL=main.js.map