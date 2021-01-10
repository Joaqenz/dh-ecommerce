const title = 'Sportland';
let db = require('../database/models')
const {validationResult} = require("express-validator");
const bcrypt = require('bcryptjs');
const saltRounds = 10;


const userController = {
    main: function (req, res, next){
        res.redirect("/user/login")
    },
    showLoginForm: function (req, res, next){
        res.render('user/loginUserForm', { title })
    },
    showRegisterForm: function (req, res, next){
        res.render('user/registerUserForm', { title })
    },
    login: function (req, res, next){
        db.User.findOne({
            where:{
                username: req.body.username
            }
        }).then(function(user){
            if(user != null && bcrypt.compareSync(req.body.password, user.password)){
                req.session.userLogged = user
                if (req.body.remind != undefined) {
                    res.cookie('remind',user.id,{
                        maxAge: 60 * 1000
                    })
                }
                console.log(req.session);
                res.redirect("/")
            }else{
                res.render('user/loginUserForm', {
                    title,
                    frase: "Usuario y/o contraseña invalidos",
                    username: req.body.username,
                });
            }
        })
    },
    register: function(req,res,next){
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            db.User.create({
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                celular: req.body.cel,
                password: bcrypt.hashSync(req.body.password, saltRounds),
                create_time: Date.now(),
                type: 0
            }).then(function(user){
                res.redirect('/user/login') 
            })
        } else {
            res.render('user/registerUserForm', { req, title, errors: errors.errors })
        }
        
    },
    edit : function(req,res,next){
        db.User.findByPk(req.params.id).then(function(user){
            if(user != null){
                res.render("user/editUserForm",{req, user, title})
            }else{
                res.send("Usuario invalido");
            }
        })
        
    },
    update: async function(req,res,next){
        db.User.update({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            celular: req.body.cel,
        },{
            where: {
                id: req.params.id
            }
        });
        await res.redirect("/user/list"); 
    },
    delete : function(req,res,next){
        db.User.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect("/user/list")
    },
    list: function(req,res,next){
        db.User.findAll().then(user => {
            console.log(user);
            res.render("user/listUsers",{user:user, req, title});
        });
    },
    check: function(req,res,next){
        if (req.session.userLogged == undefined){
            res.send('No estas logeado');
        }else{
            res.send('El usuario logeado es: ' + req.session.userLogged.username);
        }
    },
    logout: function (req, res) {
        req.session.destroy();
        res.send("logout success!");
    }
}

module.exports = (userController)

