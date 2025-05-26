module.exports=function(Sequelize, DataTypes){
    let alias="Comentario"
    let cols={
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED 
        },
        productoId:{
            type: DataTypes.INTEGER.UNSIGNED 
        },
        usuarioId:{
            type: DataTypes.INTEGER.UNSIGNED 
        },
        texto:{
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
        tableName:"comentarios",
        timestamps:true,
        underscored:false
    }
    let Comentario=Sequelize.define(alias,cols,config)

    Comentario.associate=function(models){
        Comentario.belongsTo(models.Usuario,{
            as:"usuario",
            foreignKey:"usuarioId",
        })
        Comentario.belongsTo(models.Producto,{
            as:"producto",
            foreignKey:"productoId",
        })
        
    }
    return Comentario
}