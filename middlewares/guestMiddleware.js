const { NotExtended } = require("http-errors");

function guestMiddlewere() {
    if (req.session.userLogged == undefined) {
        next;
    } else {
        res.send('No estás logueado');
    }
}

module.exports = guestMiddlewere;