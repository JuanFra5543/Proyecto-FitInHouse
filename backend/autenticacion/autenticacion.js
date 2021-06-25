//json que contiene partes para autenticar
const json_w_t = require('jsonwebtoken');

// funcion para verificar usuario
const verificarUsuario = (req, res, next) => {
    const token = req.get('token');
    json_w_t.verify(token,'secret',(e,decoded) => {
        if(e){
            return res.status(401).json({
                message:'El usuario no es valido o no esta loggeado'
            });
        }
        req.usuario = decoded.data;
        next();
    })
}

//Verifica si es ADMIN
const verificarAdmin = (req, res, next) => {
    const rol = req.usuario.usuarioRol;
    if(rol === 'ADMIN'){
        next();
    } else{
        return res.status(401).json({
            message:'El usuario no es admin'
        });
    }
}

module.exports = {verificarUsuario, verificarAdmin}