var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
var userValidator = require('../middlewares/userValidator')

/* GET users listing. */
router.get('/', userController.main);
router.get('/login', userController.login);

//mostrar un formulario de creacion
router.get('/register',userController.register);
//recibo los datos del formulario
router.post('/register',userValidator,userController.store);

//mostrar un formulario de edicion
router.get('/edit/:id',userController.edit);
//recibo los datos del formulario
router.post('/edit/:id',userController.update);

//eliminar un usuario
router.get("/delete/:id",userController.delete);

//listado de usuario
router.get("/list",userController.list);



module.exports = router;

