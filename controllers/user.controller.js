const { response } = require("express");
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

    const existEmail = await User.findOne({email});
    if (existEmail) {
        return res.status(400).json({
            ok: false,
            msg: 'Correo ya registrado en otro usuario.'
        })
    }
    const user = new User(req.body);
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

module.exports = { getUsers, createUser };
