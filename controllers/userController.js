const title = 'Sportland';

const fs = require('fs');

const readUsers = require('../helpers/readUsers')
const users = readUsers();

const {check, validationResult, body} = require('express-validator');


const userController = {
    main: function (req, res, next){
        res.redirect("/user/login")
    },
    showLoginForm: function (req, res, next){
        res.render('user/loginUserForm', { title })
    },
    login: function (req, res, next){
        for (let i = 0; i < users.length; i++) {
            if (req.body.username == users[i].username) {
                if(req.body.password == users[i].password){
                    req.session.userName = req.body.username;
                    req.session.userId = users[i].id;
                    if (req.body.remind != undefined) {
                        res.cookie('remind',users[i].id,{
                            maxAge: 60 * 1000
                        })
                    }
                    return res.send("Felicidades " + users[i].username)
                }else{
                    return res.render('user/loginUserForm', {
                        title,
                        frase: "Usuario y/o contraseña invalidos",
                        username: req.body.username,
                    });
                }
            }
        }
        return res.render('user/loginUserForm', {
            title,
            frase: "Usuario y/o contraseña invalidos",
            username: req.body.username,
        });
    },
    showRegisterForm: function (req, res, next){
        res.render('user/registerUserForm', { users, title })
    },
    register : function(req,res,next){
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let userData = {}
            userData.id = users.length == 0 ? 1 : Number(users[users.length - 1].id) + 1;
            userData.username = req.body.username;
            userData.firstname = req.body.firstname;
            userData.lastname = req.body.lastname;
            userData.cel = req.body.cel;
            userData.email = req.body.email;
            userData.password = req.body.password;
            users.push(userData);
            let usersJSON = JSON.stringify(users, null, 2);
            fs.writeFileSync(__dirname + "/../database/users.json", usersJSON);
            res.redirect("/user/list")
        } else {
            res.render('user/registerUserForm', { req, title, errors: errors.errors })
        }
        
    },
    edit : function(req,res,next){
        var idUser = req.params.id;
        var userFound;
        for(var i=0;i < users.length;i++){
            if(users[i].id == idUser){
                userFound = users[i];
                break;
            }
        }
        if(userFound){
            res.render("user/editUserForm",{userFound, title})
        }else{
            res.send("Usuario invalido");
        }
    },
    update:function(req,res,next){
        var idUser = req.params.id;
        var editUser = users.map(function(user){
            if(user.id == idUser){
                let userEditado = req.body;
                userEditado.id = idUser;
                return userEditado;
            }
            return user;
        });
        editUsersJSON = JSON.stringify(editUser, null, 2);
        fs.writeFileSync(__dirname + "/../database/users.json",editUsersJSON);
        res.redirect("/user/list")
    },
    delete : function(req,res,next){
        var idUser = req.params.id;
        var usersDestroy = users.filter(function(user){
            return user.id != idUser;
        });
        usersDestroyJSON = JSON.stringify(usersDestroy);
        fs.writeFileSync(__dirname + "/../database/users.json",usersDestroyJSON);
        res.redirect("/user/list")
    },
    list: function(req,res,next){
        console.log(req.query);
        res.render("user/listUsers",{users, title});
    }
}

module.exports = (userController)

