module.exports=function(Sequelize, DataTypes){
    let alias="Usuario"
    let cols={
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED 
        },
        username:{
            unique: true,
            type:DataTypes.STRING(45)
        },
        email:{
            unique: true,
            type:DataTypes.STRING(45)
        },
        contrasenia:{
            type:DataTypes.STRING(45)
        },
        fecha:{
            type:DataTypes.DATE
        },
        DNI:{
            type:DataTypes.INTEGER
        },
        foto:{
            type:DataTypes.STRING(45)
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
        tableName:"usuarios",
        timestamps:true,
        underscored:false
    }
    let Usuario=Sequelize.define(alias,cols,config)

    Usuario.associate=function(models){
        Usuario.hasMany(models.Producto,{
            as:"productos",
            foreignKey:"usuarioId",
        })
        Usuario.hasMany(models.Comentario,{
            as:"comentarios",
            foreignKey:"usuarioId",
        })
        
    }
    return Usuario
}