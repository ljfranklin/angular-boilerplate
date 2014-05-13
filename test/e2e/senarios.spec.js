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

        it('should be possible to control phone order via the drop down select box', function() {

            var phoneNameColumn = element.all(by.repeater('phone in phones').column('{{phone.name}}'));

            var query = element(by.model('query'));

            function getName(index) {
                return phoneNameColumn.get(index).getText();
            }

            query.sendKeys('tablet'); //let's narrow the dataset to make the test assertions shorter

            expect(getName(0)).to.eventually.equal("Motorola XOOM\u2122 with Wi-Fi");
            expect(getName(1)).to.eventually.equal("MOTOROLA XOOM\u2122");

            element(by.model('orderProp')).findElement(by.css('option[value="name"]')).click();

            expect(getName(0)).to.eventually.equal("MOTOROLA XOOM\u2122");
            expect(getName(1)).to.eventually.equal("Motorola XOOM\u2122 with Wi-Fi");
        });
    });
});