/*
 * server.js
 */


var restify = require('restify');
var app = restify.createServer();

var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;

var mongoose = require('mongoose');
var uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/'; 

var jwt = require('jsonwebtoken');
var config = require('./config');

var db = mongoose.connect(uristring);
var Schema = mongoose.Schema;
var users = require('./models/users.js');


// setup passport
passport.use(new BearerStrategy({
  },
  function(token, done) {
    jwt.verify(token, config.secret, function(err, decoded) {
      // done(null);
      if (err) {
        return done(err);
      }
      else if(decoded) {
        return done(null, decoded);
      }
      else {
        return done(null, false);
      }
    });
  }
));


// route middleware to verify a token
/*
app.use(function(req, res, next) {
  var token = req.body.token;
  // decode token
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      }
      else {
        req.decoded = decoded;
        next();
      }
    });
  }
  else {
    return res.status(403).send({ 
      success: false, 
      message: 'No token provided.' 
    });
  }
});
*/

// setup app
app.use(restify.bodyParser());
app.use(restify.queryParser());
// cross domain 対策
// http://stackoverflow.com/questions/14338683/how-can-i-support-cors-when-using-restify
app.use(restify.CORS());
app.use(restify.fullResponse());

// setup passport
app.use(passport.initialize());

// 
app.get('/', function(req, res, next) {
  // res.contentType = 'text/html';
  // res.header 
  res.send("Hello, world!");
});
// 
app.get('/users', users.index);
app.get('/users/:name', users.show);
app.post('/users', passport.authenticate('bearer', {session:false}), users.create);
app.put('/users/:name', passport.authenticate('bearer', {session:false}), users.update);
app.del('/users/:id', passport.authenticate('bearer', {session:false}), users.destroy);

app.get('/setup', function(req, res) {
  var phi = new User({
    name: 'phi',
    password: 'abcd1234',
    admin: true,
  });

  phi.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({success: true});
  })
});


app.post('/auth', function(req, res) {
  User.findOne({
    name: req.body.name,
  }, function(err, user) {
    // 失敗
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    }
    // 成功
    else if (user) {
      console.log(user);
      if (user.password !== req.body.password) {
        res.json({success: false, message: 'Authentication failed. Wrong password.'});
      }
      else {
        var token = jwt.sign(user, config.secret, {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
        });
      }
    }
  });
});


app.listen((process.env.PORT || 8000), function() {
  console.log('%s listening at %s', app.name, app.url);
});
