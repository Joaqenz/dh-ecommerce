module.exports = function(sequelize, dataTypes){
    let alias = "Product"
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING
        },
        price:{
            type: dataTypes.INTEGER
        },
        brand:{
            type: dataTypes.STRING
        },
        discount:{
            type: dataTypes.INTEGER
        },
        imglink:{
            type: dataTypes.STRING
        },
        quantity:{
            type: dataTypes.INTEGER
        },
        rating:{
            type: dataTypes.DOUBLE
        },
        description:{
            type: dataTypes.STRING
        },
        category_id:{
            type: dataTypes.INTEGER
        },
        shop_id:{
            type: dataTypes.INTEGER
        },
        city_id:{
            type: dataTypes.INTEGER
        },
        fit_id:{
            type: dataTypes.INTEGER
        },
        size_id:{
            type: dataTypes.INTEGER
        },
        color_id:{
            type: dataTypes.INTEGER
        }
    }
    let config = {
        tableName: "products",
        timestamps: false
    }
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        Product.belongsTo(models.Category, {
            as: "categories",
            foreignKey: "category_id"
        });
        Product.belongsTo(models.Fit, {
            as: "fits",
            foreignKey: "fit_id"
        });
        Product.belongsTo(models.Size, {
            as: "sizes",
            foreignKey: "size_id"
        });
        Product.belongsTo(models.Color, {
            as: "colors",
            foreignKey: "color_id"
        });
        Product.belongsToMany(models.Cart, {
            as: "carts",
            through: "cart_product",
            foreignKey: "product_id",
            otherKey: "cart_id",
            timestamps: false,
          });
      
    };

    return Product;
}