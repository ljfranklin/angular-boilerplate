
define([
    'angular',
    'angular-resource'
], function(angular) {
    var phonecatServices = angular.module('phonecatServices', ['ngResource']);

    return phonecatServices.factory('Phone', ['$resource',
        function($resource){
            return $resource('phones/:phoneId.json', {}, {
                query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
            });
        }
    ]);
});