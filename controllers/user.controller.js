const { response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");

const getUsers = async (req, res) => {
  const users = await User.find({}, "name email role google");
  res.json({
    ok: true,
    users,
  });
};

const createUser = async (req, res = response) => {
  console.log(req.body);
  const { email, password, name } = req.body;

  try {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        ok: false,
        msg: "Correo ya registrado en otro usuario.",
      });
    }
    const user = new User(req.body);

    //cifrar password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //salvar usuario
    await user.save();
    res.json({
      ok: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, revisar Logs",
    });
  }
};

const updateUser = async (req, res = response) => {
  //TODO: Validar token y comprobar si el usuario es correcto.

  const uid = req.params.id;

  try {
    const userDb = await User.findById(uid);

    if (!userDb) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado.",
      });
    }

    //actualizaciones
    const {password, google,email,  ...campos} = req.body;
    if (userDb.email !== email) {
       const existEmail = await User.findOne({ email });
      if (existEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Correo ya registrado en otro usuario.",
        });
      }
    }

    campos.email= email;
    const userActualizado = await User.findByIdAndUpdate(uid, campos, {
      new: true,
    });
    res.json({
      ok: true,
      user: userActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, revisar Logs",
    });
  }
};

module.exports = { getUsers, createUser, updateUser };
