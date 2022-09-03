const { response } = require("express");
const bcryptjs = require("bcryptjs");
const { generarJwt } = require("../helpers/jwt");
const User = require("../models/user.model");
const Hospital = require("../models/hospital.model");
const Medico = require("../models/medico.model");

const getGeneralSearch = async (req, res) => {
  const valor = req.params.valor;
  const regExp = new RegExp(valor, "i");
  // const users = await User.find({
  //   name: regExp
  // });
  // const hospitals = await Hospital.find({
  //   name: regExp
  // });
  // const medicos = await Medico.find({
  //   name: regExp
  // });
  // 1 sola promesa para varias peticiones.
  const [users, hospitals, medicos] = await Promise.all([
    User.find({
      name: regExp,
    }),
    Hospital.find({
      name: regExp,
    }),
    Medico.find({
      name: regExp,
    }),
  ]);

  res.json({
    ok: true,
    users,
    hospitals,
    medicos,
  });
};

module.exports = { getGeneralSearch };
