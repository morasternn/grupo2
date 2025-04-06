let data = require("../db/index")

let productController={
    producto: function (req, res) {
        let producto = data.productos[req.params.id]
        res.render("product",{producto:producto})
        
    },
    agregarProducto: function (req, res) {
        res.render("product-add")        
    }
}

module.exports=productController