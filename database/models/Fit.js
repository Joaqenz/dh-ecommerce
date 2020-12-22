module.exports = function(sequelize, dataTypes){
    let alias = "Fit"
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING
        }
    }
    let config = {
        tableName: "fit",
        timestamps: false
    }

    let Fit = sequelize.define(alias, cols, config);

    Fit.associate = function(models) {
        Fit.hasMany(models.Product, {
            as: "products",
            foreignKey: "fit_id"
        });
    }
    
    return Fit;
}