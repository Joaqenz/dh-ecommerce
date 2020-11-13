var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');
const path = require('path');
const multer = require('multer');

/* Multer */
var storage = multer.diskStorage({
	destination:(req,file,cb)=>{
		cb(null,'public/images/products');
	},
	filename:(req,file,cb)=>{   
		cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});
var upload = multer({storage:storage});

/* GET products listing. */
router.get('/', productController.products);
router.get('/carrito', productController.carrito); 


router.get('/addproduct',productController.create);

router.post('/addproduct',upload.any(), productController.store);

router.get('/edit/:id',productController.edit);
router.post('/edit/:id',productController.update);

router.get("/delete/:id",productController.delete);

router.get('/:id', productController.ver);


module.exports = router;

