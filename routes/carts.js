let express = require("express");
let router = express.Router();

let cartsController = require("../controllers/cartController");

/* GET     /productCart*/

router.get('/', cartsController.index);
router.get("/productCart",cartsController.productCart);

router.post("/addProduct/:id", cartsController.addProductCart);

router.get("/deleteProduct/:id", cartsController.deleteProductCart);
/* 
router.post("/deleteAllProducts", cartsController.deleteAllProducts);

router.post("/procederAlPago", cartsController.procederAlPago); */




module.exports = router;
