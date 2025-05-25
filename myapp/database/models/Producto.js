module.exports=function(Sequelize, DataTypes){
    let alias="Producto"
    let cols={
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED 
        },
        usuarioId:{
            type: DataTypes.INTEGER.UNSIGNED 
        },
        imagen:{
            type:DataTypes.STRING
        },
        nombre:{
            type:DataTypes.STRING(100)
        },
        descripcion:{
            type:DataTypes.STRING
        },
        createdAt:{
            type:DataTypes.DATE
        },
       updatedAt:{
            type:DataTypes.DATE
        },
        deletedAt:{
            type:DataTypes.DATE
        }

    }
    let config={
        tableName:"productos",
        timestamps:true,
        underscored:false
    }
    let Producto=Sequelize.define(alias,cols,config)

    Producto.associate=function(models){
        Producto.belongsTo(models.Usuario,{
            as:"usuario",
            foreignKey:"usuarioId",
        })
        Producto.hasMany(models.Comentario,{
            as:"comentarios",
            foreignKey:"productoId",
        })
        
    }
    return Producto
}