module.exports = (sequelize, dataTypes) => {
    let alias = "Cart";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: dataTypes.INTEGER,
      }
    };
    let config = {
      tableName: "carts",
      timestamps: false,
    };
  
    const Cart = sequelize.define(alias, cols, config);
  
    Cart.associate = function (models) {
      Cart.belongsToMany(models.Product, {
        as: "products",
        through: "cart_product",
        foreignKey: "cart_id",
        otherKey: "product_id",
        timestamps: false,
      });
  
      Cart.belongsTo(models.User, {
        as: "users",
        foreignKey: "user_id",
      });
    };
    return Cart;
};
  