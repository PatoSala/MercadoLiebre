const fs = require('fs');
let products = JSON.parse(fs.readFileSync(__dirname + '/../database/products.json'));

const productosController = {

    index: (req, res) => {
    res.render('productList.ejs');
    },

    show: (req, res) => {
    res.send("producto " + req.params.idProducto);
    },

    create: (req, res) => {
    res.render('products/addProduct');
    },

    store: (req, res) => {
        products.push(req.body);
        productsJSON = JSON.stringify(products);
        fs.writeFileSync(__dirname + '/../database/products.json', productsJSON);
        res.send('Producto creado');
    },

    edit: (req, res) => {
    res.render('products/editProduct', {userFound});
    },

    update: (req, res) => {
        res.send('producto editado');
    },

    delete: (req, res) => {
    res.send('Producto eliminado');
    },

};

module.exports = productosController;