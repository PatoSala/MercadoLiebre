var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');
const authMiddlewere = require('../middlewares/authMiddleware');
const guestMiddlewere = require('../middlewares/guestMiddleware');

/* list */
router.get('/list', usersController.list);

/* create */
router.get('/register', usersController.create);
router.post('/register', usersController.store);

/* edit */
router.get('/edit/:id', usersController.edit);
router.post('/edit/:id', usersController.update);

/* delete */
router.post('/delete/:id', usersController.delete);

/* login */
router.get('/login', usersController.loginForm);
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
router.get('/:id', usersController.show);

module.exports = router;
