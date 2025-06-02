let db= require('../database/models');
const bcrypt= require('bcryptjs');
const session = require("express-session")
const { Op } = require('sequelize');

let userController = {
    profile: function (req, res) {
      db.Usuario.findByPk(req.params.id, {include: [{association: "productos",include: [{ association: "comentarios" }]},{association: "comentarios"}]})
      
      .then(function(results){
        res.render("profile", {usuario: results, productos: results.productos});     
      })
      
    },
    register: function (req, res) {
        res.render("register");
    },
    login: function (req, res) {
        res.render("login");
    },
    registerprocess: function(req,res){
      
      db.Usuario.findOne({
        where: {
        [Op.or]: [
          { username: req.body.usuario },
          { email: req.body.email }
        ]}
      })
      .then (function (usuario) {
        if (usuario == null){
          if (req.body.contrasena.length > 2) {
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
          }else{
            res.send("La contrasenia tiene menos de 3 caracteres")
          }
        } else{
          res.send("El email ya existe o el nombre de usuario")
        }
      })

    },
    loginprocess: function (req, res) {
        let userInfo = {
          email: req.body.usuario,
          contrasenia: req.body.contrasena,
          recordarme: req.body.recordarme
        }
        db.Usuario.findOne({
          where: [{ email: userInfo.email }]
        })
          .then(function (results) {
            if (results == null) { 
              return res.send ("El email no está registrado")
              
            }
            let email = results.email
            let password = results.contrasenia
            if (bcrypt.compareSync(userInfo.contrasenia, password)) {
              req.session.user = results;

              if (userInfo.recordarme != undefined) {

                res.cookie("user", userInfo, { maxAge: 600000 })
              }
              res.redirect("/")
            } else { 
              return res.send("La contraseña es incorrecta")
            }
          })
    
          .catch(function (err) {
            console.log(err,"error")
            return res.send(err)
          })
    
      },
      logout: function(req,res){
        req.session.destroy();
          res.clearCookie("user");
          return res.redirect("/");
      }

        

};

module.exports = userController;