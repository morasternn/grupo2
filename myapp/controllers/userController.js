let db= require('../database/models');
const bcrypt= require('bcryptjs');
const session = require("express-session")

let userController = {
    profile: function (req, res) {
        res.render("profile", {usuario: null, productos: null});
        //profile
    },
    register: function (req, res) {
        res.render("register");
    },
    login: function (req, res) {
        res.render("login");
    },
    registerprocess: function(req,res){
        let contrasena = req.body.contrasena
        let contrasenaEncriptada=bcrypt.hashSync(contrasena,10);
        db.Usuario.create({
            username: req.body.usuario,
            email: req.body.email,
            contrasenia: contrasenaEncriptada,
            fecha: req.body.fechaNacimiento,
            DNI:req.body.dni,
            foto:req.body.foto
        })
        .then(function(result){
            return res.redirect("/users/login")
        })
        .catch(function (err) {
            return res.send(err)
        })

    },
    loginprocess: function(req,res){
        let userInfo={
            email: req.body.usuario,
            password: req.body.contrasena,
            recordarme: req.body.recordarme
        }
        //findOne
        //then validamos el email
        //validamos bcrypjs

        //si es true -- index
        req.session.user = userInfo;
        //creao la cookie

        if (userInfo.recordarme != undefined) {
            res.cookie('user', userInfo, {maxAge: 60000})
        }

        return res.redirect('/')

    },

        

};

module.exports = userController;