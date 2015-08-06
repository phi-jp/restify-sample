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