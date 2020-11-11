const productosController = {

    index: (req, res) => {
    res.send("listado de productos");
    },

    show: (req, res) => {
    res.send("producto " + req.params.idProducto);
    },

    create: (req, res) => {
    res.send("crear productos");
    },

    edit: (req, res) => {
    res.send("editar producto " + req.params.idProducto);
    },

    delete: (req, res) => {
    res.send("eliminar producto " + req.params.idProducto);
    },

};

module.exports = productosController;