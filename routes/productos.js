const express = require("express");
const router = express.Router(); 

//requerimos el controlador correspondiente a el recurso
const productosController = require("../controllers/productosController.js");

//definimos con propiedad del controlador 
router.get("/", productosController.index);

router.get("/:idProducto?", productosController.show);

router.get("/create", productosController.create);

router.get("/:idProducto?/edit", productosController.edit);

router.get("/:idProducto?/delete", productosController.delete);

module.exports = router;