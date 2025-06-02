let db= require('../database/models')
let Op = db.Sequelize.Op;

let productController= {
    producto: function (req, res) {

        db.Producto.findByPk(req.params.id, {
            include:[
                {association:"usuario"},
                {association:"comentarios", include:[{association:"usuario"}]}
            ]
        })
        
        .then(function (results) {
            res.render("product", {producto: results});
        })
        .catch(function (error) {
            res.send("Error buscando el producto: " + error);
        });
    },
    
    agregarProducto: function (req, res) {
        if (req.session.user) {
          res.render("product-add", {usuario: req.session.user});
        } else {
          res.redirect("/login");
        }
    },

    guardarProducto: function (req, res) {
        db.Producto.create({
          imagen: req.body.imagen,
          nombre: req.body.nombre,
          descripcion: req.body.descripcion,
          usuarioId: req.session.user.id,
        })
        .then(function(){
          res.redirect("/");
        })
        .catch(function(error){
          res.send("Error agregando el producto: " + error);
        });
    },

    agregarComentario: function(req,res){
        if (!req.session.user) {
            return res.redirect('/users/login');
        }
        db.Comentario.create({    
            texto: req.body.texto,
            usuarioId: req.session.user.id, 
            productoId: req.params.id,
    
        })
        .then(function () {
            return res.redirect('/producto/detalle/' + req.params.id);
          })
          .catch(function (error) {
            return res.send("Error creando el comentario: " + error)
  
          });
    },
};

module.exports=productController