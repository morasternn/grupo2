var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');


router.get('/detalle/:id', productController.producto)
router.get('/agregarproducto', productController.agregarProducto)
router.post('/agregarproducto', productController.guardarProducto);
router.post('/comentario/:id', productController.agregarComentario);
router.get('/buscar', productController.buscarProducto);

module.exports=router;
