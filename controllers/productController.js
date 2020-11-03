const fs = require('fs');
let dataProducts = JSON.parse(fs.readFileSync('./database/listado.json', 'utf-8'));

const productController = {
    main: function (req, res, next){
        res.render('Funciona', {items: dataProducts})
    },
    id: function (req, res, next){
        res.render('product', {items: dataProducts})
    },
    carrito: function (req, res, next){
        res.render('carrito', { title: 'SportLand' })
    }
}
module.exports = (productController)
