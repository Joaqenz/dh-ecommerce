const {check, validationResult, body} = require('express-validator');

const userValidator = [
    check('username')
    .notEmpty().withMessage('El nombre de usuario está vacío.'),
    check('password')
    .isLength({ min: 5 }).withMessage('Tiene que tener 5 caracteres')
    .matches(/\d/).withMessage('Tiene que contener un numero')
]


module.exports = userValidator