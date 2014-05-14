'use strict';

define([
    'chai',
    'mocks',
    'app',
    'controllers/todo'
], function (chai) {
    var expect = chai.expect;

    describe('PhoneListController', function () {

        var scope, ctrl, $httpBackend;

        beforeEach(module('todo'));

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('phones/phones.json').
                respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

            scope = $rootScope.$new();
            ctrl = $controller('PhoneListCtrl', {$scope: scope});
        }));

        it('should create "phones" model with 2 phones fetched from xhr', function() {
            expect(scope.phones).to.be.undefined;
            $httpBackend.flush();

            expect(scope.phones).to.deep.equal([{name: 'Nexus S'},
                {name: 'Motorola DROID'}]);
        });

        it('should set the default value of orderProp model', function() {
            expect(scope.orderProp).to.equal('age');
        });
    });
});