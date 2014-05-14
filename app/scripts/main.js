/*global require*/
'use strict';

require(['requirejs-config'], function() {
    require(['angular', 'app'], function (angular) {
        angular.bootstrap(document, ['phonecatApp']);
    });
});
