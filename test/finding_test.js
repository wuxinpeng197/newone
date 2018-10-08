const assert = require('assert');
const User = require('../models/Users');

// Describe our tests
describe('Finding records', function(){
  var char;
  // Add a character to the db before each tests
  beforeEach(function(done){
    char = new User({
        username: 'Matthew',
        email:'12714287@student.uts.edu.au',
        password:'1234'
    });
    char.save().then(function(){
      done();
    });
  });

  // Create tests
  it('Finds a record from the database', function(done){
    MarioChar.findOne({name: 'Matthew'}).then(function(result){
      assert(result.name === 'Matthew');
      done();
    });
  });

  it('Finds a record by unique id', function(done){
    MarioChar.findOne({_id: char._id}).then(function(result){
      assert(result._id.toString() === char._id.toString());
      done();
    });
  });

});
