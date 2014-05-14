'use strict';

define([
    'chai',
    'mocks',
    'app',
    'controllers/controllers'
], function (chai) {
    var expect = chai.expect;

    describe('Controllers', function() {

        beforeEach(module('phonecatApp'));

        describe('PhoneListController', function () {

            var scope, ctrl, $httpBackend;

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

        describe('PhoneDetailCtrl', function(){
            var scope, $httpBackend, ctrl;
            var xyzPhoneData = function() {
                return {
                    name: 'phone xyz',
                    images: ['image/url1.png', 'image/url2.png']
                }
            };

            beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
                $httpBackend = _$httpBackend_;
                $httpBackend.expectGET('phones/xyz.json').respond(xyzPhoneData());

                $routeParams.phoneId = 'xyz';
                scope = $rootScope.$new();
                ctrl = $controller('PhoneDetailCtrl', {$scope: scope});
            }));

            it('should fetch phone detail', function() {
                expect(scope.phone).to.be.undefined;
                $httpBackend.flush();

                expect(scope.phone).to.deep.equal(xyzPhoneData());
            });

        });
    });
});