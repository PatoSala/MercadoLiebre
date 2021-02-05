const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const fs = require('fs');
const { validationResult } = require('express-validator');
let users = JSON.parse(fs.readFileSync(__dirname + '/../database/users.json'));


const usersController = {

    list: (req, res) => {
        res.render('users/usersList.ejs', {users});
    },

    create: (req, res) => {
        res.render('users/addUser');
    },

    store: (req, res) => {
        let errors = validationResult(req);
        
        if (errors.isEmpty()) {

            /* 
                for (let i = 0; i < users.length; i++) {
                    if (users[i].email == req.body.email) {
                        res.render('users/addUser', {errors: errors.errors})
                    }
                } 
            */
    
            let newUser = {};
    
                newUser.id = uuidv4();
                newUser.name = req.body.name;
                newUser.email = req.body.email;
                newUser.password = bcrypt.hashSync(req.body.password, 10);
                newUser.op = 0;
            
            users.push(newUser);
            usersJSON = JSON.stringify(users);
            fs.writeFileSync(__dirname + '/../database/users.json', usersJSON);
            res.redirect('/users/login');
        } else {
            res.render('users/addUser', {errors: errors.errors});
        }
        
    },

    edit: (req, res) => {
        let idUser = req.params.id;
        let userFound;
        
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == idUser) {
                userFound = users[i];
                break;
            }
        }

        if (userFound) {
            res.render('users/editUser', {userFound});
        } else {
            res.send('Usuario no encontrado!');
        }
    },

    update: (req, res) => {
        let idUser = req.params.id;

        let editUser = users.map(function(user) {
            if (user.id == idUser) {
                let userEdit = req.body;
                userEdit.password = bcrypt.hashSync(req.body.password, 10);
                userEdit.id = idUser;
                return userEdit;
            }
            return user;
        });
        editUserJSON = JSON.stringify(editUser);
        fs.writeFileSync(__dirname + '/../database/users.json', editUserJSON);
        res.send('Usuario editado!');
    },

    delete: (req, res) => {
        let idUser = req.params.id;

        let deleteUser = users.filter(function(user) {
            return user.id != idUser;
        });

        deleteUserJSON = JSON.stringify(deleteUser);
        fs.writeFileSync(__dirname + '/../database/users.json', deleteUserJSON);
        res.send('Usuario eliminado!');
    },

    loginForm: (req, res) => {
        res.render('users/login');
    },

    login: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].email == req.body.email) {
                    if (bcrypt.compareSync(req.body.password, users[i].password)) {
                        var userLogged = users[i];
                        exports.userLogged = userLogged;
                        console.log(users[i]);
                        break;
                    }
                }
            }
    
            /* if (userLogged == undefined) {
                res.render('users/login', {errors: 'Email o contraseña incorrectos'});
            }; */
    
            req.session.userLogged = userLogged;
    
            res.redirect('/');
        } else {
            res.render('users/login', {errors: errors.errors});
        }
    },

    cart: (req, res) => {
        res.render('users/productCart', {req})
    },

    productCart: (req, res) => {
        
    },

    show: (req, res) => {
        res.render('users/profile', {req});
    },

    logOut: (req, res) => {
        req.session.userLogged = undefined;
        res.redirect('/');
    },
};

module.exports = usersController;