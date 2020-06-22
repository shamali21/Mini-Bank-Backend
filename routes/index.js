var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017/minibank';


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function (req, res, next) {
  mongo.connect(url,function(){
    assert.equal(null,err);
    var cursor=db.collection('userdata').find();
    console.log(userdata);
    assert.equal(null,err);
    db.close();
  });
});

router.get('/adminHome', function (req, res, next) {

});
router.post('/transfer', function (req, res, next) {
  var item = {
    accountFrom: req.body.accountFrom,
    accoutTo: req.body.accoutTo,
    amount: req.body.amount
  }
  mongo.connect(url, function (err, db) {
    assert.equal(null,err);
    db.collection('acc-tranfer').insertOne(item,function(err, result){
      assert.equal(null, err);
      console.log("transfer successful");
      db.close();
    });

  });
  res.redirect('/');
});
router.get('/transaction', function (req, res, next) {

});


module.exports = router;
