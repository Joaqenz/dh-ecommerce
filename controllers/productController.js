const fs = require('fs');
const dataProducts = JSON.parse(fs.readFileSync('./database/listado.json', 'utf-8'));
const title = 'SportLand'

const productController = {
    main: function (req, res, next){
        res.render('Funciona', {items: dataProducts})
    },
    id: function (req, res, next){
        let idProduct = req.params.id-1
        res.render('product', { title, items: dataProducts, idProduct})
    },
    carrito: function (req, res, next){
        res.render('carrito', { title: 'SportLand' })
    }
}
module.exports = (productController)
