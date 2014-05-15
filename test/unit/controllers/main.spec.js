'use strict';

define([
    'chai',
    'angular',
    'mocks',
    'app',
    'controllers/controllers',
    'services/services'
], function (chai, angular) {

    chai.use(function(_chai, utils) {
        _chai.Assertion.addMethod('resourceEqual', function(expected) {
            var obj = utils.flag(this, 'object');

            this.assert(
                angular.equals(obj, expected),
                'expected #{exp} but got #{act}',
                'expected #{exp} to not be #{act}',
                expected,      // expected
                angular.toJson(obj)   // actual
            );
        });
    });
    var expect = chai.expect;

    describe('Controllers', function() {

        beforeEach(module('phonecatApp'));
        beforeEach(module('phonecatServices'));

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
                expect(scope.phones).to.be.empty;
                $httpBackend.flush();

                expect(scope.phones).to.resourceEqual([{name: 'Nexus S'},
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
                expect(scope.phone).to.resourceEqual({});
                $httpBackend.flush();

                expect(scope.phone).to.resourceEqual(xyzPhoneData());
            });

        });
    });
});