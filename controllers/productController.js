const fs = require('fs');
const dataProducts = JSON.parse(fs.readFileSync('./database/listado.json', 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".");
const title = 'SportLand'

const productController = {
    main: function (req, res, next){
        res.render('Funciona', {items: dataProducts})
    },
    add: function (req, res, next){
        res.render('addProduct', {title})
    },
    carrito: function (req, res, next){
        res.render('carrito', {title})
    },
    ver:function(req,res,next){
        var productId = req.params.id;
        var producto = dataProducts.filter(function(producto){
            //condicion true/false
            return productId == producto.id;
        });
        console.log(producto);
        if(producto.length > 0){
            res.render("product",{
                producto:producto[0],
                toThousand,
                title
            });
        }else{
            res.send("No hay producto con ese id");
        }
    },
    products: function (req, res, next){
        res.render('products', {title})
    }
}
module.exports = (productController)
