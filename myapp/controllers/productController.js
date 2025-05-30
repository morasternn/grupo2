let db= require('../database/models')


let productController={
    producto: function (req, res) {

        db.Producto.findByPk(req.params.id,{include:[{association:"usuario"},{association:"comentarios",include:[{association:"usuario"}]}]})
        
        .then(function(results){
            res.render("product",{producto: results
            })
        })
        
    },
    agregarProducto: function (req, res) {
        res.render("product-add",{usuario:usuario})       
    }, 
    agregarComentario: function(req,res){
        db.Comentario.create({    
            texto: req.body.texto,
            usuarioId: req.session.userId, 
            productoId: req.params.id,
    
        })
        .then(function () {
            return res.redirect('/producto/' + req.params.id);
          })
          .catch(function (error) {
            return res.send("Error creando el comentario: " + error)
  
          });
    }
}

module.exports=productController