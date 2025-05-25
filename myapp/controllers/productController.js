let data = require("../db/index")
let usuario = data.usuario
let db= require('../database/models')
const { Association } = require("sequelize")

let productController={
    producto: function (req, res) {
        db.Producto.findOne({
            where:{id:req.params.id},
            include:[{association:"usuario"},{association:"comentarios",include:[{association:"usuario"}]}]
        })
        .then(function(data){
            res.render("product",{producto:data})
        })
        
    },
    agregarProducto: function (req, res) {
        res.render("product-add",{usuario:usuario})       
    }
}

module.exports=productController