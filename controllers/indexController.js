const indexController = {

    index: (req, res) => {
    res.render("index", {req});
    }
    
};

module.exports = indexController;