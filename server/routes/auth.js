const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (router) => {
  /**
   * user register
   */
  router.post('/auth/register', (req, res) => {
    // create user model by post body
    const user = new User(req.body);
    // save
    user.save()
      .then(doc => {
        res.sendStatus(200);
      })
      .catch(err => {
        console.error(err);
        if (err.code === 11000) {
          // 11000 means user already exist
          res.sendStatus(406);
        } else {
          res.sendStatus(500);
        }
      });
  });

  /**
   * user login
   */
  router.post('/auth/login', (req, res) => {
    // find user in db that match request name
    User.findOne({username: req.body.username})
      .then(doc => {
        if (doc) {
          // user exist,
          // use model instance method to check if password valid
          const valid = doc.authenticate(req.body.password);
          if (valid) {
            // password valid, auth success
            // create session
            req.session.user = {
              username: doc.username,
              _id: doc._id
            };
            res.sendStatus(200);
          } else {
            // password invalid
            res.sendStatus(401);
          }
        } else {
          // user not exist
          res.sendStatus(401);
        }
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      });
  });

  /**
   * user logout
   */
  router.post('/auth/logout', (req, res) => {
    // destroy session
    req.session.user = null;
    res.sendStatus(200);
  });

  /**
   * check current session user
   */
  router.post('/auth/current', (req, res) => {
    // return user info in JSON
    res.json(req.session.user);
  });
};
