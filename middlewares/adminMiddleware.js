function adminMiddleware(req,res,next) {
    if (req.session.userLogged.type == true) {
        next();
    }else{
        res.send('Esta pagina es solo para Admins');
    }
}

module.exports = adminMiddleware;