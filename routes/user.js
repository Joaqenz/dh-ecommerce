var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const userValidator = require('../middlewares/userValidator')
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')

/* GET users listing. */
router.get('/', userController.main);

router.get('/login',guestMiddleware,userController.showLoginForm);
router.post('/login', userController.login);

//mostrar un formulario de creacion
router.get('/register',guestMiddleware,userController.showRegisterForm);
router.post('/register',userValidator,userController.register);

//mostrar un formulario de edicion
router.get('/view/:id',authMiddleware,userController.view);
router.get('/edit/:id',authMiddleware,userController.edit);
//recibo los datos del formulario
router.post('/edit/:id',userController.update);

//eliminar un usuario
router.get("/delete/:id",userController.delete);

//listado de usuario
router.get("/list",adminMiddleware,userController.list);

router.get('/check',userController.check);

router.get('/logout',userController.logout);


module.exports = router;

