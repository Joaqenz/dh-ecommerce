const title = 'SportLand';

let db = require('../database/models')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".");

const productController = {
    index: (req, res) => {
        db.Product.findAll().then(function(products){
            console.log(products)
            res.render('products/products',{products:products, title, req})
        });
    },
    ver: (req, res) => {
        db.Product.findByPk(req.params.id,{include: [
            {association: "users"},
            {association: "categories"},
            {association: "fits"},
            {association: "sizes"},
            {association: "colors"}
        ]})
        .then(function(product){
            console.log(product)
            res.render('products/detailProduct',{product:product,toThousand, title, req})
        });
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
            brand: req.body.brand,
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
            color_id: req.body.color_id
        });
        res.redirect("/products");
    },
    edit : function(req, res, next){
        product = db.Product.findByPk(req.params.id);
        category = db.Category.findAll()
        fit = db.Fit.findAll()
        size = db.Size.findAll()
        color = db.Color.findAll()
        Promise.all([product, category, fit, size, color])
            .then(function([product, category, fit, size, color]){
                console.log([product, category, fit, size, color]);
            res.render("products/editProduct",{
                product:product,
                category:category,
                fit:fit,
                size:size,
                color:color,
                title,req
            })
        });
    },
    update : function(req, res, next){
        db.Product.update({
            name: req.body.name,
            price: req.body.price,
            brand: req.body.brand,
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
            color_id: req.body.color_id
        },{
            where: {
                id: req.params.id
            }
        });
        res.redirect("/products/"); 
    },
    delete : function(req,res,next){
       db.Product.destroy({
           where: {
               id: req.params.id
           }
       })
       res.redirect('/products')
    },
    carrito: function (req, res, next){
        res.render('products/carrito', {title, req})
    }
}
module.exports = (productController)



