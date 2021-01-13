var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');
const authMiddlewere = require('../middlewares/authMiddleware');
const guestMiddlewere = require('../middlewares/guestMiddleware');
const registerMiddilewere = require('../middlewares/registerMiddlewere');

/* list */
router.get('/list', usersController.list);

/* create */
router.get('/register', guestMiddlewere, usersController.create);
router.post('/register', registerMiddilewere, usersController.store);

/* edit */
router.get('/edit/:id', authMiddlewere,usersController.edit);
router.post('/edit/:id', usersController.update);

/* delete */
router.post('/delete/:id', usersController.delete);

/* login */
router.get('/login', guestMiddlewere, usersController.loginForm);
router.post('/login', usersController.login);

/* logOut */
router.post('/logout', usersController.logOut);

/* carrito */
router.get('/cart/:id', authMiddlewere, usersController.cart);

/* check */
router.get('/check', (req, res) => {
  if (req.session.userLogged != undefined) {
    res.send('El usuario ' + req.session.userLogged.name + ' está logueado');
  } else {
    res.send('nadie inició sesión')
  }
});

/* perfil */
router.get('/:id', authMiddlewere,usersController.show);

module.exports = router;
