let db= require('../database/models')

let userController = {
    profile: function (req, res) {
        res.render("profile", {usuario: null, productos: null});
    },
    register: function (req, res) {
        res.render("register");
    },
    login: function (req, res) {
        res.render("login");
    },
    registerprocess: function(req,res){
        db.Usuario.create({
            username: req.body.usuario,
            email: req.body.email,
            contrasenia:req.body.contrasena,
            fecha: req.body.fechaNacimiento,
            DNI:req.body.dni,
            foto:req.body.foto
        })
        .then(function(){
            return res.redirect("/users/login")
        })
        .catch(function (err) {
            return res.send(err)
        })

    }

};

module.exports = userController;