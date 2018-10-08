const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const House = mongoose.model('House');
const Fav = mongoose.model('Fav');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const uuid = require('uuid/v4');
const mime = require('mime');

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

router.post('/auth/register', (req, res) => {
  const user = new User(req.body);
  user.save()
    .then(doc => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.error(err);
      if (err.code === 11000) {
        res.sendStatus(406);
      } else {
        res.sendStatus(500);
      }
    });
});

router.post('/auth/login', (req, res) => {
  User.findOne({username: req.body.username})
    .then(doc => {
      if (doc) {
        const valid = doc.authenticate(req.body.password);
        if (valid) {
          req.session.user = {
            username: doc.username,
            _id: doc._id
          };
          res.sendStatus(200);
        } else {
          res.sendStatus(401);
        }
      } else {
        res.sendStatus(401);
      }
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.post('/auth/logout', (req, res) => {
  req.session.user = null;
  res.sendStatus(200);
});

router.post('/auth/current', (req, res) => {
  res.json(req.session.user);
});

router.post('/house/add', upload.single('image'), (req, res) => {
  if (!req.session.user) {
    res.sendStatus(401);
    return;
  }
  const house = new House({
    ...req.body,
    image: req.file.filename,
    createBy: req.session.user._id
  });
  house.save()
    .then(doc => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.get('/house/list-mine', (req, res) => {
  if (!req.session.user) {
    res.sendStatus(401);
    return;
  }
  House.find({createBy: req.session.user._id})
    .then(docs => {
      res.json(docs);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.get('/house/detail', (req, res) => {
  if (!req.session.user) {
    res.sendStatus(401);
    return;
  }
  House.findById(req.query.id)
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.get('/house/list', (req, res) => {
  if (!req.session.user) {
    res.sendStatus(401);
    return;
  }
  const limit = parseInt(req.query.limit);
  const offset = parseInt(req.query.offset);
  const sort = req.query.sort;
  Promise.all([
    House.count(),
    House.find({}, null, {
      skip: offset,
      limit: limit,
      sort: {
        price: parseInt(sort)
      }
    })
  ])
    .then(reses => {
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

router.post('/house/toggle-fav', (req, res) => {
  if (!req.session.user) {
    res.sendStatus(401);
    return;
  }
  const favObj = {user: req.session.user._id, house: req.body.houseId};
  Fav.find(favObj)
    .then(docs => {
      if (docs && docs.length) {
        return Fav.remove(favObj);
      } else {
        const fav = new Fav(favObj);
        return fav.save();
      }
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.post('/house/check-fav', (req, res) => {
  if (!req.session.user) {
    res.sendStatus(401);
    return;
  }
  const favObj = {user: req.session.user._id, house: req.body.houseId};
  Fav.findOne(favObj)
    .then(doc => {
      res.json({fav: !!doc});
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.get('/house/list-favs', (req, res) => {
  if (!req.session.user) {
    res.sendStatus(401);
    return;
  }
  Fav.find({user: req.session.user._id}).populate('house')
    .then(docs => {
      res.json(docs);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = router;
