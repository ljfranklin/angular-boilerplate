/*global define*/
'use strict';

define([
    'angular'
], function(angular) {
    var filters = angular.module('phonecatFilters', []);

    filters.filter('checkmark', function() {
        return function(input) {
            return input ? '\u2713' : '\u2718';
        };
    });

    return filters;
});
