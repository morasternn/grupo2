let data = require("../db/index")

let indexController = {
    index: function (req,res) {
        res.render ("index", {listado: data.productos})   
    },
    resultados: function(req,res){
        res.render("search-results", { productos: data.productos });
    }
};


module.exports= indexController;