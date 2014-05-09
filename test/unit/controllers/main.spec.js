'use strict';

define([
    'chai',
    'mocks',
    'app',
    'controllers/todo'
], function (chai) {
    var expect = chai.expect;

    describe('PhoneListController', function () {

        beforeEach(module('todo'));

        var $scope;

        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();
            $controller('PhoneListCtrl', {$scope: $scope});
        }));

        it('should create "phones" model with 3 phones', function() {
            expect($scope.phones.length).to.equal(3);
        });
    });
});