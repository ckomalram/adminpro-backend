const { response } = require("express");
const Usuario = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const {generarJwt} = require('../helpers/jwt');

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
};
