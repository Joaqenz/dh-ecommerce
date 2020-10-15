var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SportLand' });
});

router.get('/carrito', function(req, res, next) {
  res.render('carrito', { title: 'SportLand' });
});


module.exports = router;
