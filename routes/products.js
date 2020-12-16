var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

const upload = require('../middlewares/multer');

/* GET products listing. */
router.get('/', productController.index);
router.get('/carrito', productController.carrito); 


router.get('/addproduct',authMiddleware,productController.create);

router.post('/addproduct',upload.single("img"), productController.store);

router.get('/edit/:id',productController.edit);
router.post('/edit/:id',upload.single("img"),productController.update);

router.get("/delete/:id",productController.delete);

router.get('/:id', productController.ver);


module.exports = router;

