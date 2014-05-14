/*global define*/
'use strict';

define([
    'angular',
    'angular-route',
    'controllers/controllers',
    'filters/filters'
], function (angular) {
    var app = angular.module('phonecatApp', ['ngRoute','phonecatControllers','phonecatFilters']);

    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/phones', {
                    templateUrl: 'partials/phone-list.html',
                    controller: 'PhoneListCtrl'
                }).
                when('/phones/:phoneId', {
                    templateUrl: 'partials/phone-detail.html',
                    controller: 'PhoneDetailCtrl'
                }).
                otherwise({
                    redirectTo: '/phones'
                });
        }
    ]);

    return app;
});
