let db= require('../database/models')
let op = db.Sequelize.Op;

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
        db.Producto.findAll({
            where: {
                nombre: { [op.like]: "%" + req.query.search + "%" }
            },
            include: [
                { association: "usuario" },
                { association: "comentarios" }
            ]
        })
        .then(function(results){
            return res.render('search-results', {results:results});
        }).catch(function(error) {
            return res.send(error)
        })
    }
};


module.exports= indexController;