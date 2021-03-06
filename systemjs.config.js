/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        defaultJSExtensions: true,
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            // other libraries
            'rxjs': 'npm:rxjs',
            'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
            'jquery': 'npm:jquery/',
            'lodash': 'npm:lodash/lodash.js',
            'moment': 'npm:moment/',
            'ng2-select': 'npm:ng2-select/bundles/ng2-select.umd.js',
            'jw-bootstrap-switch-ng2': 'npm:jw-bootstrap-switch-ng2',
            'ng2-bootstrap': 'npm:ng2-bootstrap',
            'ng2-component-spinner': 'npm:ng2-component-spinner',
            'symbol-observable': 'npm:symbol-observable',
            'angular2-jwt': 'npm:angular2-jwt',
            'ng2-select2': 'npm:ng2-select2',
            // 'ng2-iq-select2': 'npm:ng2-iq-select2'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular2-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'moment': { main: 'moment.js', defaultExtension: 'js' },
            'ng2-bootstrap': { format: 'cjs', main: 'bundles/ngx-bootstrap.umd.js', defaultExtension: 'js' },
            'jw-bootstrap-switch-ng2': {
                main: './dist/index.js',
                defaultExtension: 'js'
            },
            'ng2-component-spinner':{
                main: './dist/index.js',
                defaultExtension: 'js'
            },
            'angular2-jwt':{
                 main: 'angular2-jwt.js',
                 defaultExtension: 'js'   
            },
            'ng2-select2':{
                main: 'ng2-select2.js',
                defaultExtension: 'js'
            },
            // 'ng2-iq-select2':{
            //     main: './component.js',
            //     // defaultJSExtensions: 'js'
            // },
            'symbol-observable': { main: 'index.js', defaultExtension: 'js' }
        }
    });
})(this);