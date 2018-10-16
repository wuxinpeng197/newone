const mongoose = require('mongoose');
const House = mongoose.model('House');
const Fav = mongoose.model('Fav');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid/v4');
const mime = require('mime');

/**
 * create upload method with disk storage.
 * files will be upload to `/public/uploads`, and rename by UUID.
 * ONLY image files are acceptable, otherwise they will be ignore.
 */
const upload = multer({
  storage: multer.diskStorage({
    destination (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/uploads'));
    },
    filename (req, file, cb) {
      cb(null, `${uuid()}.${mime.extension(file.mimetype)}`);
    }
  }),
  fileFilter (req, file, cb) {
    const mime = file.mimetype;
    cb(null, mime.indexOf('image') >= 0);
  }
});

module.exports = (router) => {
  /**
   * Create new house information.
   */
  router.post('/house/add', upload.single('image'), (req, res) => {
    if (!req.session.user) {
      res.sendStatus(401);
      return;
    }
    // create house model by post body
    const house = new House({
      ...req.body,
      image: req.file.filename,
      createBy: req.session.user._id
    });
    // save house
    house.save()
      .then(doc => {
        // success
        res.sendStatus(200);
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      });
  });

  /**
   * List houses created my current user.
   * Login required.
   */
  router.get('/house/list-mine', (req, res) => {
    // return 401 if user not login
    if (!req.session.user) {
      res.sendStatus(401);
      return;
    }
    // find houses created my current user
    House.find({createBy: req.session.user._id})
      .then(docs => {
        // success
        res.json(docs);
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      });
  });

  /**
   * Get single house detail by id.
   * Login required.
   */
  router.get('/house/detail', (req, res) => {
    // return 401 if user not login
    if (!req.session.user) {
      res.sendStatus(401);
      return;
    }
    // Get single house detail by id.
    House.findById(req.query.id)
      .then(doc => {
        // success
        res.json(doc);
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      });
  });

  /**
   * List all house information.
   * Login required.
   */
  router.get('/house/list', (req, res) => {
    // return 401 if user not login
    if (!req.session.user) {
      res.sendStatus(401);
      return;
    }
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    const sort = req.query.sort;
    // perform count and query in the same time
    Promise.all([
      // count all houses
      House.count(),
      // query houses by page and sort
      House.find({}, null, {
        skip: offset,
        limit: limit,
        sort: {
          price: parseInt(sort)
        }
      })
    ])
      .then(reses => {
        // success
        res.json({
          data: reses[1],
          total: reses[0]
        });
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      });
  });

  /**
   * Add or cancel favourite house.
   * Login required.
   */
  router.post('/house/toggle-fav', (req, res) => {
    // return 401 if user not login
    if (!req.session.user) {
      res.sendStatus(401);
      return;
    }
    const favObj = {user: req.session.user._id, house: req.body.houseId};
    // check if favourite exist in db
    Fav.find(favObj)
      .then(docs => {
        if (docs && docs.length) {
          // fav exist, do cancel favourite
          // remove it from db
          return Fav.remove(favObj);
        } else {
          // fav not exist, do add favourite
          // add it to db
          const fav = new Fav(favObj);
          return fav.save();
        }
      })
      .then(() => {
        // success
        res.sendStatus(200);
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      });
  });

  /**
   * Check if favourite exist for user and house
   * Login required.
   */
  router.post('/house/check-fav', (req, res) => {
    // return 401 if user not login
    if (!req.session.user) {
      res.sendStatus(401);
      return;
    }
    const favObj = {user: req.session.user._id, house: req.body.houseId};
    // check if favourite exist in db
    Fav.findOne(favObj)
      .then(doc => {
        // success
        res.json({fav: !!doc});
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      });
  });

  /**
   * List all favourite houses by user.
   * Login required.
   */
  router.get('/house/list-favs', (req, res) => {
    // return 401 if user not login
    if (!req.session.user) {
      res.sendStatus(401);
      return;
    }
    // find all favourite create by current user,
    // and populate their house information
    Fav.find({user: req.session.user._id}).populate('house')
      .then(docs => {
        // success
        // in case of house deleted, filter it out if house is null
        res.json(docs.filter(v => !!v.house));
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      });
  });
};

