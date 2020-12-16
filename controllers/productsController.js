const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
let products = JSON.parse(fs.readFileSync(__dirname + '/../database/products.json'));

const productsController = {

    list: (req, res) => {
    res.render('products/productsList.ejs', {products});
    },

    show: (req, res) => {
    res.send("producto " + req.params.idProducto);
    },

    create: (req, res) => {
    res.render('products/addProduct');
    },

    store: (req, res) => {
        let newProduct = {};
            newProduct.id = uuidv4();
            newProduct.name = req.body.name;
            newProduct.price = req.body.price;
            newProduct.cat = req.body.cat;
            newProduct.desc = req.body.desc;
        products.push(newProduct);
        productsJSON = JSON.stringify(products);
        fs.writeFileSync(__dirname + '/../database/products.json', productsJSON);
        res.send('Producto creado');
    },

    edit: (req, res) => {
        let idProduct = req.params.id;
        let productFound;
        
        for (let i = 0; i < products.length; i++) {
            if (idProduct == products[i].id) {
                productFound = products[i];
                break;
            }
        }

        if (productFound) {
            res.render('products/editProduct', {productFound});
        } else {
            res.send('Producto no encontrado');
        }

        console.log(productFound);
    },

    update: (req, res) => {
        let idProduct = req.params.id;

        let editProduct = products.map(function(product) {
            if (product.id == idProduct) {
                let productEdit = req.body;
                productEdit.id = idProduct;
                console.log(productEdit);
                return productEdit;
            }
            return product;
        });
        editProductJSON = JSON.stringify(editProduct);
        fs.writeFileSync(__dirname + '/../database/products.json', editProductJSON);
        res.send('Producto editado');
    },

    delete: (req, res) => {
        let idProduct = req.params.id;

        let deleteProduct = products.filter(function(product) {
            return product.id != idProduct;
        });

        deleteProductJSON = JSON.stringify(deleteProduct);
        fs.writeFileSync(__dirname + '/../database/products.json', deleteProductJSON);
        res.send('Producto eliminado');
    },

};

module.exports = productsController;