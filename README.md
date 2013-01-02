#level-cbatch[![build status](https://secure.travis-ci.org/kesla/level-cbatch.png)](http://travis-ci.org/kesla/level-cbatch)

A chainable api for batch() in levelup

## example

```js
levelup(dir, { createIfMissing: true }, function(err, db) {
    cbatch(db); 

    db.cbatch()
    	.put('foo', 'bar')
    	.del('hello')
    	.exec(callback);
});
```