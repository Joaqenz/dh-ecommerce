const fs = require('fs');
const path = require('path');
const title = 'SportLand'

const readProducts = require('../helpers/readProducts')
const productsFilePath = path.join(__dirname, '../database/listado.json');
const dataProducts = readProducts()

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".");

const productController = {
    index: (req, res) => {
		const dataProducts = readProducts()
		return res.render('products/products', { dataProducts, title, req});
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
        res.render('products/addProduct', {title, req})
    },
    store : function(req, res, next){
        let datosProducto = {
            id: dataProducts.length == 0 ? 1 : Number(dataProducts[dataProducts.length - 1].id) + 1,
			...req.body,
			image: req.file.filename
		}
		dataProducts.push(datosProducto);
		dataProductsJSON = JSON.stringify(dataProducts, null, 2);
		fs.writeFileSync(path.join(__dirname, '../database/listado.json'), dataProductsJSON);
        res.send("Producto Creado");
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
