var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');


router.get('/detalle/:id', productController.producto)
router.get('/agregarproducto', productController.agregarProducto)
router.post('/comentario/:id', productController.agregarComentario);


module.exports=router;
