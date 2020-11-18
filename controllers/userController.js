let title = 'Sportland';

const fs = require('fs');
let users = JSON.parse(fs.readFileSync(__dirname + "/../database/users.json"));
const {check, validationResult, body} = require('express-validator');


const userController = {
    main: function (req, res, next){
        res.redirect("/user/login")
    },
    login: function (req, res, next){
        res.render('user/loginUserForm', { title })
    },
    register: function (req, res, next){
        res.render('user/registerUserForm', { users, title })
    },
    store : function(req,res,next){
        errors = validationResult(req);
        console.log(validationResult(req));
        let userData = {
			id: users.length == 0 ? 1 : Number(users[users.length - 1].id) + 1,
			...req.body
		}
        users.push(userData);
        let usersJSON = JSON.stringify(users, null, 2);
        fs.writeFileSync(__dirname + "/../database/users.json", usersJSON);
        res.redirect("/user/list")
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
        editUsersJSON = JSON.stringify(editUser);
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

