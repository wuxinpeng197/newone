const assert = require('assert');
const User = require('../models/Users');

// Describe our tests
describe('Updating records', function(){
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
  it('Updates the name of a record', function(done){
      MarioChar.findOneAndUpdate({name: 'Matthew'}, {name: 'Luigi'}).then(function(){
          MarioChar.findOne({_id: char._id}).then(function(result){
              assert(result.name === 'Luigi');
              done();
          });
      });
  });

 it('Adds 1 to the weight of every record', function(done){
    MarioChar.update({}, { $inc: { weight: 1 } }).then(function(){
        MarioChar.findOne({name: 'Matthew'}).then(function(record){
            assert(record.weight === 51);
            done();
        });
    });
 });


});
