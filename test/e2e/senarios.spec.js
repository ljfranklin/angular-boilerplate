'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect=chai.expect;

describe('PhoneCat App', function() {

    describe('Phone list view', function() {

        beforeEach(function() {
            browser.get('');
        });

        it('should filter the phone list as user types into the search box', function() {

            var phoneList = element.all(by.repeater('phone in phones'));
            var query = element(by.model('query'));

            expect(phoneList.count()).to.eventually.equal(3);

            query.sendKeys('nexus');
            expect(phoneList.count()).to.eventually.equal(1);

            query.clear();
            query.sendKeys('motorola');
            expect(phoneList.count()).to.eventually.equal(2);
        });
    });
});