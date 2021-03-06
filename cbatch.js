function Batch(db, options) {
    this.db = db;
    this.batch = [];
    this.options = options || {};
}

Batch.prototype.put = function(key, value) {
    this.batch.push({
        type: 'put',
        key: key,
        value: value
    });
    return this;
}

Batch.prototype.del = function(key) {
    this.batch.push({
        type: 'del',
        key: key
    });
    return this;
}

Batch.prototype.exec = function(callback) {
    this.db.batch(this.batch, this.options, callback);
}

module.exports = function(db) {
    db.cbatch = function(options) {
        return new Batch(db, options);
    }
}