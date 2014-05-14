/*global define*/
'use strict';

define(['app'], function (app) {
        return app.controller('PhoneListCtrl', ['$scope', '$http',
            function($scope, $http) {
                $http.get('phones/phones.json').success(function(data) {
                    $scope.phones = data;
                });

                $scope.orderProp = 'age';
            }
        ]);
    }
);