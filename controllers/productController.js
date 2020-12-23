const fs = require('fs');
const path = require('path');
const title = 'SportLand';

let db = require('../database/models')

const readProducts = require('../helpers/readProducts')
const productsFilePath = path.join(__dirname, '../database/listado.json');
const dataProducts = readProducts()

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".");

const productController = {
    index: (req, res) => {
        db.Product.findAll().then(function(products){
            console.log(products)
            res.render('products/products',{products:products, title, req})
        });
    },
    ver: (req, res) => {
		let id = req.params.id;
		for (let i = 0; i < dataProducts.length; i++) {
			if (dataProducts[i].id == id) {
				return res.render('products/detailProduct', { producto: dataProducts[i], toThousand, title, req })
			}
		}
		return res.send("producto no encontrado");
	},
    create: function (req, res, next){
        category = db.Category.findAll()
        fit = db.Fit.findAll()
        size = db.Size.findAll()
        color = db.Color.findAll()
        Promise.all([category, fit, size, color]).then(values => {
            console.log(values[1]);
            res.render('products/addProduct', {values, title, req})
        });
    },
    store : function(req, res, next){
        db.Product.create({
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            imglink: req.file.filename,
            quantity: req.body.quant,
            rating: 0,
            description: req.body.desc,
            category_id: req.body.cat,
            shop_id: req.body.shop,
            market_id: req.body.market,
            city_id: req.body.city,
            fit_id: req.body.fit,
            user_id: req.body.user,
            size_id: req.body.size,
        })
        res.redirect("/products");
    },
    edit : function(req, res, next){
        var idProduct = req.params.id;
        var idFound;
        for(var i=0;i < dataProducts.length;i++){
            if(dataProducts[i].id == idProduct){
                idFound = dataProducts[i];
                break;
            }
        }
        if(idFound){
            res.render("products/editProduct",{idFound, title, req})
        }else{
            res.send("Producto no encontrado");
        }
    },
    update : function(req, res, next){
        var idProduct = req.params.id;
        var editProducts = dataProducts.map(function(product){
            if(product.id == idProduct){
                let editProduct = req.body;
                editProduct.id = idProduct;
                return editProduct;
            }
            return user;
        });
        editProductsJSON = JSON.stringify(editProducts);
        fs.writeFileSync(__dirname + "/../database/listado.json",editProductsJSON);
        res.redirect("/products/edit/" + idProduct);
    },
    delete : function(req,res,next){
        var idProduct = req.params.id;
        var idFound;
        for(var i=0;i < dataProducts.length;i++){
            if(dataProducts[i].id == idProduct){
                idFound = dataProducts[i];
                break;
            }
        }
        if(idFound){
            var productDestroy = dataProducts.filter(function(product){
                return product.id != idProduct;
            });
            productDestroyJSON = JSON.stringify(productDestroy);
            fs.writeFileSync(__dirname + "/../database/listado.json",productDestroyJSON);
            res.send("Producto eliminado")
        }else{
            res.send("Producto no encontrado");
        }
    },
    carrito: function (req, res, next){
        res.render('products/carrito', {title, req})
    },
}
module.exports = (productController)



