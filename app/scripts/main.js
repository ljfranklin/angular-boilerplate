/*global require*/
'use strict';

require(['requirejs-config'], function() {
    require(['angular', 'app', 'controllers/phone-list-controller'], function (angular) {
        angular.bootstrap(document, ['phonecatApp']);
    });
});
