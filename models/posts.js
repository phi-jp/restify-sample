
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// ポストのスキーム
var postSchema = new Schema({
  _creator : { type: Number, ref: 'User' },
  title: String,
  content: String,
});

mongoose.model('Post', postSchema);

var Post = mongoose.model('Post');

module.exports = {
  index: function(req, res) {
    Post.find(function(err, data){
      res.send({
        posts: data,
      });
    });
  },
  show: function(req, res) {
    res.send({function:'Show', status: 'OK', id: data._id});
  },
  create: function(req, res) {
    res.send({
      users: res.user,
    });

    // res.send({function:'Create', status: 'OK', id: data._id});
  },
  update: function(req, res) {
    res.send({function:'Update', status: 'OK', id: data._id});
  },
  destroy: function(req, res) {
    res.send({function:'Destroy', status: 'OK', id: data._id});
  },
};
