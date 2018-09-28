const assert = require('assert');
//const  mocha =require('mocha');
const User = require('../models/Users');
//expect = require("chai").expect;
// Describe our tests
describe('Saving records', function(){

    // Create tests
    it('Saves a record to the database', function(done){
        const char = new User({
            username: 'Matthew',
            email:'12714287@student.urs.edu.au',
            password:'1234'
        });
        char.save().then(function(){
            assert(!char.isNew);
            done();
        });
    });
});