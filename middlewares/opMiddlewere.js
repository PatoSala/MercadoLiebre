function opMiddlewere(req, res, next) {
    if (req.session.userLogged.op == 1) {
        next();
    } else {
        res.send('No tienes los permisos necesarios');
    }
}

module.exports = opMiddlewere;