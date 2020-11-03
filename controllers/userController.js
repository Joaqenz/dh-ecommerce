const fs = require('fs');

const userController = {
    main: function (req, res, next){
        res.send('Funciona')
    },
    login: function (req, res, next){
        res.render('register', { title: 'SportLand' })
    },
    register: function (req, res, next){
        res.render('login', { title: 'SportLand' })
    }
}
module.exports = (userController)


