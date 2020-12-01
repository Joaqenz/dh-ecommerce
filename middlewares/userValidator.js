const readUsers = require('../helpers/readUsers')
const {check, validationResult, body} = require('express-validator');
let users = readUsers()

const userValidator = [
    body('username')
    .notEmpty().withMessage('Completa el usuario.').bail().custom((value) => {
        for(var i=0;i < users.length;i++){
            if(value == users[i].username){
              return false;
            }
            return true;
        }
    }).withMessage('El usuario ya está en uso.'),
    body('firstname').isLength({ min: 2 }).withMessage('El nombre requiere minimo 2 caracteres.'),
    body('lastname').notEmpty().withMessage('Completa tu Apellido'),
    body('cel').notEmpty().withMessage('Completa el telefono.'),
    body('email').isEmail().withMessage('No es un email.').bail()
    .custom((value) => {
      for(var i=0;i < users.length;i++){
          if(value  == users[i].email){
            return false;
          }
          return true;
      }
    }).withMessage('El email ya está en uso.'),
    body('password')
    .isLength({ min: 5 }).withMessage('La contraseña requiere minimo 5 caracteres.')
    .matches(/\d/).withMessage('La contraseña requiere al menos un numero.'),
    body('cpassword').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('No concuerdan las contraseñas.');
        }
        return true;
    })
]
module.exports = userValidator