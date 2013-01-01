var levelup = require('levelup');
var rimraf = require('rimraf');
var test = require('tap').test;

var cbatch = require('../cbatch.js');

var dir ='/tmp/level-cbatch-test'

function setup(callback) {
    rimraf(dir, function() {
        levelup(dir, { createIfMissing: true }, function(err, db) {
            if (err) throw err;
            cbatch(db); 
            callback(db);
        });
    });
}


setup(function(db) {
    test('put', function(t) {
        t.plan(5);
        db.cbatch()
            .put('foo', 'bar')
            .put('hello', 'world')
            .exec(function(err) {
                t.equals(err, null);
                db.get('foo', function(err, value) {
                    t.equals(err, null);
                    t.equals(value, 'bar');
                });
                db.get('hello', function(err, value) {
                    t.equals(err, null);
                    t.equal(value, 'world');
                });
            });
    });

    test('del', function(t) {
        t.plan(4);
        db.cbatch()
            .put('foo', 'baz')
            .del('hello')
            .exec(function(err) {
                t.equals(err, null);
                db.get('foo', function(err, value) {
                    t.equals(err, null);
                    t.equals(value, 'baz');
                });
                db.get('hello', function(err) {
                    t.equals(err.name, 'NotFoundError');
                });
            });
    });
});