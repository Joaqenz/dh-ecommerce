function guestMiddleware(req,res,next) {
    if (req.session.userLogged == undefined) {
        next();
    }else{
        res.send('Esta pagina es solo para invitados');
    }
}

module.exports = guestMiddleware;