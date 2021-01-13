const fs = require('fs');
let users = JSON.parse(fs.readFileSync(__dirname + '/../database/users.json'));

function registerMiddilewere(req, res, next) {
    for (let i = 0; i < users.length; i++) {
        if (req.body.email != users[i].email) {
            next();
        } else {
            res.send('Email already exists');
        }
    }
}

module.exports = registerMiddilewere;