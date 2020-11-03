var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController')

/* GET products listing. */
router.get('/', productController.main);
router.get('/prueba', productController.main);
router.get('/carrito', productController.carrito);
router.get('/:id', productController.id);



module.exports = router;

