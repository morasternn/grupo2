let indexController = require('../controllers/indexController')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', indexController.index)
router.get('/search-results', indexController.resultados)

module.exports = router;
