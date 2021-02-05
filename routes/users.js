var express = require('express');
var router = express.Router();
const fs = require('fs');
let users = JSON.parse(fs.readFileSync(__dirname + '/../database/users.json'));
var usersController = require('../controllers/usersController');
const authMiddlewere = require('../middlewares/authMiddleware');
const guestMiddlewere = require('../middlewares/guestMiddleware');
const registerMiddilewere = require('../middlewares/registerMiddlewere');
const opMiddlewere = require('../middlewares/opMiddlewere');
const { check, validationResult, body } = require('express-validator');

/* list */
router.get('/list', authMiddlewere, opMiddlewere, usersController.list);

/* create */
router.get('/register', guestMiddlewere, usersController.create);
router.post('/register', [
  check('name').isLength( { min: 2 }).withMessage('• El nombre debe tener al menos 2 caracteres'),
  check('email').isLength().withMessage('• Email: campo obligatorio'),
  check('email').isEmail().withMessage('• El formato de email no es correcto'),
  /* body('email').custom(function(value) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == req.body.email) {
            return false;
        }
      } 
    }).withMessage('• Este email ya está en uso'), */
  check('password').isLength( { min: 6 }).withMessage('• La contraseña debe ser de por lo menos 6 caracteres'),
],usersController.store);

/* edit */
router.get('/edit/:id', authMiddlewere,usersController.edit);
router.post('/edit/:id', usersController.update);

/* delete */
router.post('/delete/:id', usersController.delete);

/* login */
router.get('/login', guestMiddlewere, usersController.loginForm);
router.post('/login', [
  check('email').isLength(),
], usersController.login);

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
