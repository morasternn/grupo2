let db= require('../database/models')


let productController={
    producto: function (req, res) {

        db.Producto.findByPk(req.params.id,{include:[{association:"usuario"},{association:"comentarios",include:[{association:"usuario"}]}]})
        
        .then(function(results){
            res.render("product",{producto: results})
        })
        
    },
    agregarProducto: function (req, res) {
        res.render("product-add",{usuario:usuario})       
    }
}

module.exports=productController