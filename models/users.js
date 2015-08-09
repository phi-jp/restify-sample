

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// スキーマの定義
var userSchema = new Schema({
  score: Number,
  name: { type: String, required: true },
  screen_name: String,
  password: String, 
  admin: Boolean,
  description: String,

  posts : [{ type: Schema.ObjectId, ref: 'Post' }],
});

// モデルを生成
mongoose.model('User', userSchema);

var User = mongoose.model('User');

module.exports = {
  setup: function(req, res) {
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
  },
  index: function(req, res) {
    User.find(function(err, data){
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
