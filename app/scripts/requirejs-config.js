/*global require*/
'use strict';

require.config({
    paths: {
        angular: '../bower_components/angular/angular'
    },
    shim: {
        angular: {
            exports: 'angular'
        }
    }
});