const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const User = require('../models/User');
const Post = require('../models/Post');
const Gallery = require('../models/Gallery');
const config = require('../config/db');
const path = require('path');

// Multer Storage


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'file-' + Date.now() + '.' + filetype);
    }
});

const upload = multer({storage: storage, limits: { fieldSize: 100 * 1024 * 1024 } });


router.post('/archive', upload.single('image'), async function(req, res, next) {
  const { name } = req.body;
  const avatar = 'http://localhost:3000/public/' + req.file.filename;
  const gallery = new Gallery({
    name,
    avatar
  });
  const createdGallery = await gallery.save();
  res.status(200).json({
    gallery: {
      ...createdGallery._doc
    }
  })
  console.log(createdGallery);
  })


router.get("/archive", async (req, res, next) => {
  const images = await Gallery.find();
  res.status(200).json({ images })
})

router.get("/archive/:id", (req, res, next) => {
  Gallery.findById(req.params.id, (err, image) => {
    if(err) return err;
    res.json(image)
  });
});

router.delete('/archive', (req, res, next) => {
  Gallery.deleteMany(req.params.id, req.body, function (err, gallery) {
      if (err) return next(err);
      res.json(gallery);
    });
})

//LOGIN, REGISTER AND LOGOUT

router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, msg: 'Failed to Register'});
    } else {
      res.json({success: true, msg: 'User Registered Successfully'});
    }
  });
});

router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg:'User Does Not Exist'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({ data: user }, config.secret, {
          expiresIn: 604800
        });
        res.json({
          success: true,
          token: `Bearer ${token}`,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg:'Wrong Password'});
      }
    });
  });
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json({
    user: {
      _id: req.user._id,
      name: req.user.name,
      username: req.user.username,
      email: req.user.email,
      avatar: req.user.avatar
    }
  });
});

// For Blog Posts
//const token = getToken(req.headers);
    //if (token) {
router.get('/allPosts', function(req, res, next) {
  Post.find((err, posts) => {
    if (err) return next(err);
        res.json(posts)}).sort({
          '_id': -1
        });
    // } else {
    //   return res.status(403).send({success: false, msg: 'Unauthorized.'});
    });


router.get('/singlePost/:id',  function(req, res, next) {
  // const token = getToken(req.headers);
  // if (token) {
    Post.findById(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    })
  // } else {
  //   return res.status(403).send({success: false, msg: 'Unauthorized.'});
  // }
});

router.post('/newPost', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  
  const newPost = new Post({
    postTitle: req.body.postTitle,
    postAuthor: req.body.postAuthor,
    postContent: req.body.postContent,
    postImgUrl: req.body.postImgUrl
  });
  //console.log(createdPost);

  Post.create(newPost, (err, user) => {
    if(err) {
      res.json({success: false, msg: 'Post failed to submit'});
    } else {
      res.json({success: true, msg: 'Successfully Posted'});
    }
  })
});

router.put('/editPost/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  const id = req.params.id;
  console.log(id);
  const token = getToken(req.headers);
  if (token) {
    Post.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.delete('/deletePost/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    Post.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.delete('/deleteAllPosts', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    Post.deleteMany(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;