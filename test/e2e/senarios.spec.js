'use strict';

var Q = require('q');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect=chai.expect;

describe('PhoneCat App', function() {

    before(function() {
        browser.getCurrentUrlHash = getCurrentUrlHash.bind(browser);
    });

    describe('Phone list view', function() {

        beforeEach(function() {
            browser.get('');
        });

        it('should redirect index.html to index.html#/phones', function() {
            browser.get('');
            expect(browser.getCurrentUrlHash()).to.eventually.equal('/phones');
        });

        it('should filter the phone list as user types into the search box', function() {

            var phoneList = element.all(by.repeater('phone in phones'));
            var query = element(by.model('query'));

            expect(phoneList.count()).to.eventually.equal(20);

            query.sendKeys('nexus');
            expect(phoneList.count()).to.eventually.equal(1);

            query.clear();
            query.sendKeys('motorola');
            expect(phoneList.count()).to.eventually.equal(8);
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

        it('should render phone specific links', function() {
            var query = element(by.model('query'));
            query.sendKeys('nexus');
            element(by.css('.phones li a')).click();

            expect(browser.getCurrentUrlHash()).to.eventually.equal('/phones/nexus-s');
        });
    });

    describe('Phone detail view', function() {

        beforeEach(function() {
            browser.get('#/phones/nexus-s');
        });

        it('should display nexus-s page', function() {
            var phoneName = element(by.binding('phone.name'));
            expect(phoneName.getText()).to.eventually.equal('Nexus S');
        });

        it('should display the first phone image as the main phone image', function() {
            var activeImg = element(by.css('img.phone.active'));
            expect(activeImg.getAttribute('src')).to.eventually.match(/img\/phones\/nexus-s.0.jpg/);
        });

        it('should swap main image if a thumbnail image is clicked on', function() {
            element(by.css('.phone-thumbs li:nth-child(3) img')).click();
            expect(element(by.css('img.phone.active')).getAttribute('src')).to.eventually.match(/img\/phones\/nexus-s.2.jpg/);

            element(by.css('.phone-thumbs li:nth-child(1) img')).click();
            expect(element(by.css('img.phone.active')).getAttribute('src')).to.eventually.match(/img\/phones\/nexus-s.0.jpg/);
        });
    });

    function getCurrentUrlHash() {
        var deferred = Q.defer();
        var urlPromise = this.getCurrentUrl();

        urlPromise.then(function(url) {
            var hash = url.substring(url.indexOf('#') + 1);
            deferred.resolve(hash);
        });

        return deferred.promise;
    }
});
