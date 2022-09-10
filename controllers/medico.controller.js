const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Medico = require("../models/medico.model");
const { generarJwt } = require("../helpers/jwt");

const getMedicos = async (req, res = response) => {
  const medicos = await Medico.find()
    .populate("user", "name img email")
    .populate("hospital", "name img");
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
  const id = req.params.id;
  const uid = req.uid;

  try {
    const medicoDb = await Medico.findById(id);

    if (!medicoDb) {
      return res.status(404).json({
        ok: false,
        mgs: "Medico no encontrado.",
      });
    }

    const cambiosMedico = {
      ...req.body,
      user: uid,
    };

    const medicoActualizado = await Medico.findByIdAndUpdate(
      id,
      cambiosMedico,
      { new: true }
    );

    res.json({
      ok: true,
      mgs: "updateMedico",
      medico: medicoActualizado,
    });

    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, revisar Logs",
    });
  }

};

const deleteMedico = async (req, res = response) => {
  const id = req.params.id;
  try {
    const medicoDb = await Medico.findById(id);

    if (!medicoDb) {
      return res.status(404).json({
        ok: false,
        mgs: "Medico no encontrado.",
      });
    }

    await Medico.findByIdAndDelete(id);
 

    res.json({
      ok: true,
      mgs: "deleteMedico"
    });

    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, revisar Logs",
    });
  }
};

module.exports = { getMedicos, createMedico, updateMedico, deleteMedico };
