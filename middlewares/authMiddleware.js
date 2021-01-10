function authMiddleware(req,res,next) {
    if (req.session.userLogged != undefined) {
        next();
    }else{
        res.send('Esta pagina es solo para usuarios');
    }
}

module.exports = authMiddleware;