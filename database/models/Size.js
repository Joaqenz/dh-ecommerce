module.exports = function(sequelize, dataTypes){
    let alias = "Size"
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING
        },
        type:{
            type: dataTypes.INTEGER
        }
    }
    let config = {
        tableName: "sizes",
        timestamps: false
    }

    let Size = sequelize.define(alias, cols, config);

    Size.associate = function(models) {
        Size.hasMany(models.Product, {
            as: "sizes",
            foreignKey: "size_id"    
        });
    }
    
    return Size;
}