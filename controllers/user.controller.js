const { response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");
const { generarJwt } = require("../helpers/jwt");

const getUsers = async (req, res) => {
  const vfrom = Number(req.query.from) || 0;
  const vlimit = Number(req.query.limit) || 5;
  // console.log(vfrom);
  // const users = await User
  // .find({}, "name email role google")
  // .skip(vfrom)
  // .limit(5);

  // const totalUsers = await User.count();

  //Ejecutar promesas simultaneas.
  const [users, totalUsers] = await Promise.all([
    await User.find({}, "name img email role google").skip(vfrom).limit(vlimit),
    await User.count(),
    // await User.countDocuments(),
  ]);

  res.json({
    ok: true,
    users,
    uid: req.uid,
    totalUsers,
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

    //Generar Token - JWT
    // _id o id : mongo va saber.
    const token = await generarJwt(user._id);

    res.json({
      ok: true,
      user: user,
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
    const { password, google, email, ...campos } = req.body;
    if (userDb.email !== email) {
      const existEmail = await User.findOne({ email });
      if (existEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Correo ya registrado en otro usuario.",
        });
      }
    }

    campos.email = email;
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

const deleteUser = async (req, res = response) => {
  //TODO: Construirlo con activo/desactivo indexado.
  const uid = req.params.id;

  try {
    const userDb = await User.findById(uid);

    if (!userDb) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado.",
      });
    }

    await User.findByIdAndDelete(uid);
    res.status(200).json({
      ok: true,
      msg: `Usuario ${uid} eliminado.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, revisar Logs",
    });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
