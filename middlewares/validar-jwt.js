const jwt = require("jsonwebtoken");

const validarJwt = (req, res, next)=> {

    //Leer Token del Header
    //x-token
    const token = req.header('x-token');
    // console.log(token);
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la petición.",
          });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWTSECRET);

        //Asignar valor al request
        req.uid = uid;
        // console.log(uid);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
          ok: false,
          msg: "Token invalido.",
        });
      }

    // next();
};

module.exports = { validarJwt}