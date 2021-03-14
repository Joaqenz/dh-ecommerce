let db = require("../database/models");
const title = 'SportLand';
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".");

let mainController = {
  index: (req, res, next) => {
      res.send('funciona')
  },
  productCart : (req, res, next) => {
      let user= req.session.userLogged;
      db.Product.findAll({
        include: [
          {association: 'carts', where: { user_id: user.id, status: 0 } },
          {association: "categories"},
          {association: "fits"},
          {association: "sizes"},
          {association: "colors"}
        ]
      }).then((products) => {
        res.render('products/shopCart', { products: products, toThousand, req ,title });
      });
  },
  addProductCart: (req, res, next) => {
      let user = req.session.userLogged;
      if(user) {
          db.Cart.findOne({
              where: {
                  user_id: user.id,
                  status: 0
              },
              include: [
                  {association: 'products'}
              ]
          }).then(cart => {
              db.Product.findByPk(req.params.id)
                  .then(productStock => {
                      if(productStock.quantity > 0) {
                          db.Cart_Product.findOne({
                            where: {
                              cart_id: cart.id,
                              product_id: req.params.id,
                            },
                          }).then((productCart) => {
                            if (productCart == null) {
                              db.Cart_Product.create({
                                product_id: req.params.id,
                                cart_id: cart.id,
                              });                                
                            }
                            res.redirect('/cart/productCart')
                          });
                      }
                  });
          });
      } else {
          res.redirect('/user/login')
      }
  },
  deleteProductCart: (req, res, next) => {
    let user = req.session.userLogged;
    if(user) {
      db.User.findOne({
        include: [
          {
            association: 'carts', 
            where: { user_id: user.id, status: 0 },
          },
        ],
      }).then(userCart => {
          db.Cart_Product.destroy({
            where: {
              cart_id: userCart.carts[0].id,
              product_id: req.params.id
            }
          })
          res.redirect('/cart/productCart');
      });
    }
    
  }
}

module.exports = mainController;

/* {
    deleteProductCart: (req, res, next) => {
      
      let user = req.session.userLogged;

      if(user) {
        db.User.findOne({
          include: [
            {
              association: 'carts',
              where: { user_id: user.id, status: 0 },
            },
          ],
        }).then(userCart => {
          
            db.Cart_Product.destroy({
              where: {
                cart_id: userCart.carts[0].dataValues.id,
                product_id: req.params.id
              }
            })

            res.redirect('/carts/productCart');
        });
      }
      
    }, 
    deleteAllProducts: (req, res, next) => {

      let userLogged = req.session.usuarioLogueado;


      if(userLogged) {
        db.User.findOne({
          include: [
            {
              association: 'carts',
              where: { user_id: userLogged.id, status: 0 },
            },
          ],
        }).then(userCart => {
          
            db.Cart_Product.destroy({
              where: {
                cart_id: userCart.carts[0].dataValues.id,
              },
            })
            res.redirect('/carts/productCart');
        });
      }
  
    },  
    procederAlPago: (req, res, next) => {

      let userLogged = req.session.usuarioLogueado;

       db.Users.findOne({
          include: [
            {
              association: 'carts',
              where: { user_id: userLogged.id, status: 0 },
            },
          ],
        }).then(userCart => {
            
            db.Cart_Product.findAll({
              where: {
                cart_id: userCart.carts[0].id
              }
            }).then(productsInCart => {

              //Valida que haya productos en el carrito - SI NO HAY MANDA ERROR
              if(productsInCart.length == 0) {
                
                res.send('No hay productos en el carrito');           

              }

              //Validacion para ver si hay stock
              for(let i=0; i < productsInCart.length; i++) {

                //Validacion para ver si hay stock
                db.Products.findByPk(productsInCart[i].product_id)
                  .then(product => {

                    if(product.stock < req.body.stock[i]) {
                      let errorDeCantidad = 'hubo un error en la cantidad solicitada en alguno de los productos';

                      //Busca los productos que se encuentren en un carrito del usuario logueado
                      db.Products.findAll({
                        include: [
                          { association: 'images' },
                          { association: 'carts', where: { user_id: userLogged.id, status: 0 } },
                        ]
                      }).then((products) => {
                          
                        //Muestra los productos
                        res.render('carts/productCart', { productos : products, errorDeCantidad: errorDeCantidad, userLogged: userLogged });
                      });
                    }
                  })
              }

              
              //Actualizacion de stock_order si supera la validacion de backend
              for(let i=0; i < productsInCart.length; i++) {
                

                //Actualiza el stock pedido y la compra
                db.Cart_Product.update({
                  stock_order: req.body.stock[i]
                },{
                  where: {
                    id: productsInCart[i].id
                  }
                })
                

                //Saco el stock del producto ya comprado de la DB
                db.Products.findByPk(productsInCart[i].product_id)
                  .then(subProductStock => {

                    db.Products.update({
                        stock: (subProductStock.stock - req.body.stock[i])
                      },{
                      where: {
                        id: productsInCart[i].product_id
                      }
                    })
                  })
        
              }



                  //Cierro el carrito actual
                  db.Carts.update({
                    status: 1
                  },{
                    where: {
                      id: userCart.carts[0].id
                    }
                  })

                  
                  if(req.body.tipo_de_envio == 'local') {

                    db.Carts.update({
                    status: 1,
                    shipping_type: 0
                  },{
                    where: {
                      id: userCart.carts[0].id
                    }
                  })

                  } else {

                    db.Carts.update({
                    status: 1,
                    shipping_type: 1,
                    place: req.body.tipo_envio
                  },{
                    where: {
                      id: userCart.carts[0].id
                    }
                  })

                  }

                  //Abre un nuevo carrito para futuras compras
                  db.Carts.create({
                    status: 0,
                    user_id: userCart.id
                  });

                  res.redirect('/thanksforbuying');
            })
      
        })
      
    }
} */