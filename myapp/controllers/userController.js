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
    loginprocess: function (req, res) {
        let userInfo = {
          email: req.body.email,
          contrasenia: req.body.contraseña,
          recordarme: req.body.recordarme
        }
        
        db.Usuario.findOne({
          where: [{ email: userInfo.email }]
        })
          .then(function (results) {
            let email = results.email
            let password = results.contrasenia
    
            if (results == undefined) { 
              return res.send ("El email no está registrado")
              
            }
            if (bcrypt.compareSync(userInfo.contrasenia, password)) {

              req.session.user = resultado;
            
              if (userInfo.recordarme != undefined) {
                res.cookie("user", userInfo, { maxAge: 600000 })
              }
              res.redirect("/")

            } else { 
              return res.send("La contraseña es incorrecta")
            }
          })
    
          .catch(function (err) {
            return res.send(err)
          })
    
      },

        

};

module.exports = userController;