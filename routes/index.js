var express = require('express');
var AWS = require('aws-sdk');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'AWS tutorials'});
});

module.exports = router;
