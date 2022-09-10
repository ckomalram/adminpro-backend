const { response } = require("express");
const Usuario = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const { generarJwt } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-jwt-verify");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    //verificar email
    const userDb = await Usuario.findOne({ email });

    if (!userDb) {
      return res.status(404).json({
        ok: false,
        msg: "Email no valido.",
      });
    }
    //verificar contraseña
    const validarPassword = bcryptjs.compareSync(password, userDb.password);

    if (!validarPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña no valida.",
      });
    }

    //Generar Token - JWT
    // _id o id : mongo va saber.
    const token = await generarJwt(userDb._id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, revisar Logs",
    });
  }
};

//google Sign-In
const loginWithGoogle = async (req, res = response) => {
  try {
    // const googleUser = await  googleVerify(req.body.token);
    const { email, name, picture } = await googleVerify(req.body.token);

    const userDB = await Usuario.findOne({email});
    let user;

    if (!userDB) {
      user=new Usuario({
        name,
        email, 
        password: '@@@',
        img: picture,
        google: true
      });
    }else{
      user= userDB
      user.google = true;
    }

    //guardar usuario
    await user.save();

    //Generar Token - JWT
    // _id o id : mongo va saber.
    const token = await generarJwt(user._id);


    res.status(201).json({
      ok: true,
      msg: "Ingreso de Token al backend exitoso.",
      email,
      name,
      picture,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, revisar Logs",
    });
  }
};

module.exports = {
  login,
  loginWithGoogle,
};
