var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'SportLand', req });
});
router.get('/template', function(req, res, next) {
    res.render('template', { req, title: 'SportLand' });
});

module.exports = router;