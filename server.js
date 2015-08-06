var restify = require('restify');

var server = restify.createServer();
server.use(restify.bodyParser());
server.use(restify.queryParser());

var mongoose = require('mongoose');
var uristring = 'mongodb://localhost/';

var db = mongoose.connect(uristring);
var Schema = mongoose.Schema;

// スキーマの定義
var userSchema = new Schema({
  score: Number,
});

// モデルを生成
mongoose.model('user', userSchema);
var User = mongoose.model('user');

var users = {
  index: function(req, res) {
    User.find(function(arr, data){
      // すべてのコレクションの情報を返す
      res.send(data);
    });
    return 
  },
  show: function(req, res) {

  },
  create: function(req, res) {
    var user = new User();
    user.score = 10;
    user.save(function(err, data) {
      res.send({function:'Create', status: 'OK', id: data._id})
    });
  },
  update: function(req, res) {

  },
  destroy: function(req, res) {

  },
};

server.get('/users', users.index);
server.get('/users:id', users.show);
server.post('/users', users.create);

server.get('/hoge', function(req, res, next) {
  res.send({message: "Hello, world!"});
});

server.listen(8000, function() {
  console.log('%s listening at %s', server.name, server.url);
});
