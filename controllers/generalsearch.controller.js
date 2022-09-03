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

const searchByCollection = async (req, res) => {
  const valor = req.params.valor;
  const vtable = req.params.table;
  const regExp = new RegExp(valor, "i");

  let data = [];
  switch (vtable) {
    case "users":
      data = await User.find({
        name: regExp,
      });
      

      break;
    case "hospitals":
      data = await Hospital.find({
        name: regExp,
      }).populate('user', 'name img');

      break;

    case "medicos":
      data = await Medico.find({
        name: regExp,
      }).populate('user', 'name img')
      .populate('hospital', 'name img');
      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: "La tabla tiene que ser users, medicos, hospitals",
      });
  }

  res.status(200).json({
    ok: true,
    resultados: data,
  });
};

module.exports = { getGeneralSearch, searchByCollection };
