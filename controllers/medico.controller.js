const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Medico = require("../models/medico.model");
const {generarJwt} = require('../helpers/jwt');

const getMedicos = async (req, res = response) => {
  
//   const Medico = await Medico.find({}, "name img user");
  res.json({
    ok: true,
    mgs: 'Get Medico'
  });
};

const createMedico = async (req, res = response) => {

    res.json({
        ok: true,
        mgs: 'createMedico'
      });
  };
  
  const updateMedico = async (req, res = response) => {
    res.json({
        ok: true,
        mgs: 'updateMedico'
      });
  };
  
  const deleteMedico = async (req, res = response) => {
    res.json({
        ok: true,
        mgs: ' deleteMedico'
      });
  };
 

module.exports = { getMedicos,createMedico ,updateMedico,deleteMedico};
