const readJSON = require('../helpers/readJSON')
const {check, validationResult, body} = require('express-validator');
let users = readJSON();

const userValidator = [
    body('username')
    .notEmpty().withMessage('Completa este campo.').bail().custom((value) => {
        for(var i=0;i < users.length;i++){
            if(value  == users[i].name){
              return false;
            }
            return true;
        }
    }).withMessage('Ya existe un usuario.'),
    body('password')
    .isLength({ min: 5 }).withMessage('Tiene que tener minimo 5 caracteres.')
    .matches(/\d/).withMessage('Tiene que contener al menos un numero.'),
    body('cel')
    .notEmpty().withMessage('Completa este campo.'),
    body('email').isEmail().withMessage('Completa este campo.').custom((value) => {
        for(var i=0;i < users.length;i++){
            if(value  == users[i].email){
              return false;
            }
            return true;
        }
    }).withMessage('Completa este campo.'),
    body('firstname')
    .notEmpty().withMessage('Completa este campo.'),
    body('lastname')
    .notEmpty().withMessage('Completa este campo.'),
    body('cpassword').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('No concuerdan las contraseñas.');
        }
        return true;
    })
]
module.exports = userValidator