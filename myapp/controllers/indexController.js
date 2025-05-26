let db= require('../database/models')

let indexController = {
    index: function (req,res) {

        let relacion = {
            include:{
                association: "comentarios"
            }
        }
       
        db.Producto.findAll(relacion)
        .then(function(results) {
            
            res.render ("index", {listado: results})   

        }).catch(function(error) {
            return res.send(error)
        })

        

    },
    resultados: function(req,res){
        res.render("search-results", { productos: data.productos });
    }
};


module.exports= indexController;