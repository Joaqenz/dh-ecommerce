const {check, validationResult, body} = require('express-validator');

const userValidator = [
    check('username')
    .notEmpty().withMessage('El nombre de usuario está vacío.'),
    check('password')
    .isLength({ min: 5 }).withMessage('must be at least 5 chars long')
    .matches(/\d/).withMessage('Tiene que contener un numero')
]


module.exports = userValidator