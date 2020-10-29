var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'SportLand' });
});

router.get('/carrito', function(req, res, next) {
    res.render('carrito', { title: 'SportLand' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'SportLand' });
});

router.get('/register', function(req, res, next) {
    res.render('register', { title: 'SportLand' });
});

router.get('/product', function(req, res, next) {
    res.render('product', { title: 'SportLand' });
});

router.get('/products', function(req, res, next) {
    res.render('products', { title: 'SportLand' });
});

router.get('/addProduct', function(req, res, next) {
    res.render('addProduct', { title: 'SportLand' });
});

module.exports = router;