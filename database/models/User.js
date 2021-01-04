module.exports = function(sequelize, dataTypes){
    let alias = "User"
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username:{
            type: dataTypes.STRING
        },
        firstname:{
            type: dataTypes.STRING
        },
        lastname:{
            type: dataTypes.STRING
        },
        email:{
            type: dataTypes.STRING
        },
        celular:{
            type: dataTypes.INTEGER
        },
        password:{
            type: dataTypes.STRING
        },
        create_time:{
            type: dataTypes.DATE
        },
        type:{
            type: dataTypes.BOOLEAN
        }
    }
    let config = {
        tableName: "users",
        timestamps: true
    }

    let User = sequelize.define(alias, cols, config);

    User.associate = function(models) {
        User.hasMany(models.Product, {
            as: "products",
            foreignKey: "user_id"
        });
    }
    
    return User;
}