const { NotExtended } = require("http-errors");

function guestMiddlewere(req, res, next) {
    if (req.session.userLogged == undefined) {
        next();
    } else {
        res.redirect('/users/:id');
    }
}

module.exports = guestMiddlewere;