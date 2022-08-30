const { response } = require("express");
const Usuario = require("../models/user.model");
const bcryptjs = require("bcryptjs");

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

    res.json({
      ok: true,
      msg: "hola mundo",
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
