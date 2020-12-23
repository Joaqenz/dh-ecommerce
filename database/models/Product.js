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
        market_id:{
            type: dataTypes.INTEGER
        },
        city_id:{
            type: dataTypes.INTEGER
        },
        fit_id:{
            type: dataTypes.INTEGER
        },
        user_id:{
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
    let Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        Product.belongsTo(models.User, {
            as: "users",
            foreignKey: "id"
        });
    };
    Product.associate = function(models) {
        Product.belongsTo(models.Category, {
            as: "categories",
            foreignKey: "id"
        });
    };
    Product.associate = function(models) {
        Product.belongsTo(models.Fit, {
            as: "fits",
            foreignKey: "id"
        });
    };

    Product.associate = function(models) {
        Product.belongsTo(models.Size, {
            as: "sizes",
            foreignKey: "id"
        });
    };
    Product.associate = function(models) {
        Product.belongsTo(models.Color, {
            as: "colors",
            foreignKey: "id"
        });
    };


    return Product;
}