var MongoClient = require('mongodb').MongoClient;
exports.mongos=function mongos(obj){
    var url = "mongodb://localhost:27017/doubanMovie";
    MongoClient.connect(url, { useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var myobj = obj;
        db.db("doubanMovie").collection("top250").insertOne(myobj, function (err, res) {
            if (err) throw err;
            db.close();
            console.count("正在储存\\")
        });
    });
}


