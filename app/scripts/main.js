/*global require*/
'use strict';

require(['requirejs-config'], function() {
    require(['angular', 'app', 'controllers/todo'], function (angular) {
        angular.bootstrap(document, ['todo']);
    });
});
