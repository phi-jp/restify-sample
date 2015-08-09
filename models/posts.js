
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// ポストのスキーム
var postSchema = new Schema({
  _creator : { type: Schema.ObjectId, ref: 'User' },
  title: String,
  content: String,
});

mongoose.model('Post', postSchema);

var Post = mongoose.model('Post');

module.exports = {
  index: function(req, res) {
    Post.find({})
      .populate('_creator', 'name')
      .exec(function(err, data) {
        res.send({
          posts: data,
        });
      });
  },
  show: function(req, res) {
    res.send({function:'Show', status: 'OK', id: data._id});
  },
  create: function(req, res) {
    // create post
    var post = new Post({
      _creator: req.user._id,
      title: 'untitled',
      content: 'text text text text text text',
    });

    post.save(function(err) {
      if (err) return handleError(err);

      res.send('success');
    });
  },
  update: function(req, res) {
    res.send({function:'Update', status: 'OK', id: data._id});
  },
  destroy: function(req, res) {
    res.send({function:'Destroy', status: 'OK', id: data._id});
  },
};
