

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// スキーマの定義
var userSchema = new Schema({
  score: Number,
  name: String, 
  screen_name: String,
  password: String, 
  admin: Boolean,
  // description: String,
});

// モデルを生成
mongoose.model('user', userSchema);

var User = mongoose.model('user');

module.exports = {
  index: function(req, res) {
    User.find(function(arr, data){
      // すべてのコレクションの情報を返す
      var users = data.map(function(user) {
        return {
          id: user._id,
          name: user.name,
        };
      });
      res.send({
        users: users,
      });
    });
    return 
  },
  show: function(req, res) {
    User.findOne({
      name: req.params.name,
    }, function(err, user) {
      res.json({
        user: {
          name: user.name,
        },
      });
    });
  },
  create: function(req, res) {
    var user = new User();
    user.score = 10;
    user.save(function(err, data) {
      res.send({function:'Create', status: 'OK', id: data._id})
    });
  },
  update: function(req, res) {
    res.send("成功!!!");
  },
  destroy: function(req, res) {
    User.remove({ _id: req.params.id }, function(err) {
      res.send({function:'Delete', status: 'OK'});
    });
  },
};
