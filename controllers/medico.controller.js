const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Medico = require("../models/medico.model");
const { generarJwt } = require("../helpers/jwt");

const getMedicos = async (req, res = response) => {
  const medicos = await Medico.find({}, "name img user hospital");
  res.json({
    ok: true,
    mgs: "Get Medico",
    medicos,
  });
};

const createMedico = async (req, res = response) => {
  const uid = req.uid;
  const medico = new Medico({
    user: uid,
    ...req.body,
  });

  try {
    const medicoDb = await medico.save();
    res.json({
      ok: true,
      mgs: "createMedico",
      medicoDb,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, revisar Logs",
    });
  }
};

const updateMedico = async (req, res = response) => {
  res.json({
    ok: true,
    mgs: "updateMedico",
  });
};

const deleteMedico = async (req, res = response) => {
  res.json({
    ok: true,
    mgs: " deleteMedico",
  });
};

module.exports = { getMedicos, createMedico, updateMedico, deleteMedico };
