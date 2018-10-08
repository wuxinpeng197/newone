//var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var baseUrl = "https://localhost:3000/";
//var util = require("util");

describe('returns luke', function() {
    it('returns luke', function(done) {
        request.get({ url: baseUrl + '/login' },
            function(error, response, body) {
                
                expect(response.statusCode).to.equal(200);
                console.log(body);
                done();
            });
    });
});