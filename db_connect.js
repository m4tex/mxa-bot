const MongoClient = require('mongodb').MongoClient;

module.exports = function(collection) ***REMOVED***
    var db = MongoClient.connect('mongodb://localhost:27017/' + collection);
    console.log('Connected to the Mongo Database');
    return db;
***REMOVED***