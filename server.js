var restify = require('restify');

var server = restify.createServer();
server.use(restify.bodyParser());
server.use(restify.queryParser());

server.get('/hoge', function(req, res, next) {
  res.send({message: "Hello, world!"});
});

server.listen(8000, function() {
  console.log('%s listening at %s', server.name, server.url);
});
