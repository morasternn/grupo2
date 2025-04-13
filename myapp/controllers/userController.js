let data = require("../db/index");

let userController = {
    profile: function (req, res) {
        res.render("profile", {usuario: data.usuario, productos: data.productos});
    },
    register: function (req, res) {
        res.render("register");
    },
    login: function (req, res) {
        res.render("login");
    },
    
};

module.exports = userController;