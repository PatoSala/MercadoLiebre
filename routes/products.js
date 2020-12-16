const express = require('express');
const router = express.Router(); 

//requerimos el controlador correspondiente a el recurso
const productsController = require("../controllers/productsController.js");

//definimos con propiedad del controlador 
router.get('/list', productsController.list);

router.get('/create', productsController.create);
router.post('/create', productsController.store);

router.get('/edit/:id', productsController.edit);
router.post('/edit/:id', productsController.update);

router.post('/delete/:id', productsController.delete);

module.exports = router;