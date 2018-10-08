const assert = require('assert');
const User = require('../models/Users');

// Describe our tests
describe('Deleting records', function(){
  var char;
  // Add a character to the db before each tests
  beforeEach(function(done){
    char = new  User({
        username: 'Matthew',
        email:'12714287@student.uts.edu.au',
        password:'1234'
    });
    char.save().then(function(){
      done();
    });
  });

  // Create tests
  it('Deletes a record from the database', function(done){
    MarioChar.findOneAndRemove({name: 'Matthew'}).then(function(){
      MarioChar.findOne({name: 'Matthew'}).then(function(result){
        assert(result === null);
        done();
      });
    });
  });

});
