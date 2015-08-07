# restify-sample
restify-sample


## Dev

### setup

db 起動

```
$ mongod -dbpath=db/
```

server 起動

```
$ node server.js
```


## Ref

- http://hanamiju.hatenablog.com/entry/2015/03/05/225029
- http://yutapon.hatenablog.com/entry/2014/04/29/124657
- http://shimz.me/blog/node-js/1167


### curl コマンド

post

curl http://0.0.0.0:8000/users -X POST -d "user[name]=phi" -d "user[age]=26"

- http://d.hatena.ne.jp/thata/20100207/1265554365

### oauth

- https://www.npmjs.com/package/passport-restify
- https://gist.github.com/yoitsro/8693021
- https://stormpath.com/blog/build-api-restify-stormpath/

passport

- http://qiita.com/bisque33/items/c5080daf8bc3bc10efb5
- http://qiita.com/itagakishintaro/items/e5a0481b51e6a17b304c
- http://tech-sketch.jp/2012/03/nodejs-oauth.html


### express で bearer

- http://blog.jeroenpelgrims.be/token-based-sessionless-auth-using-express-and-passport/
- https://github.com/resurge/passport-http-bearer#making-authenticated-requests

### BearerStrategy x jwt

- https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
- http://blog.jeroenpelgrims.be/token-based-sessionless-auth-using-express-and-passport/
- https://gist.github.com/cgiacomi/cd1efa187b8cccbe2a61
- http://www.dampmann.com/2014/09/nodejs-mongodb-jwt-bcrypt-and.html
