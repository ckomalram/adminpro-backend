const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Hospital = require("../models/hospital.model");
const { generarJwt } = require("../helpers/jwt");

const getHospitals = async (req, res = response) => {
  //   const hospital = await Hospital.find({}, "name img user");
  res.json({
    ok: true,
    mgs: "Get Hospital",
  });
};

const createHospital = async (req, res = response) => {

  const uid = req.uid;
  const hospital = new Hospital(
    {
      user: uid,
      ...req.body
    }
  );


  try {
    const hospitalDb = await hospital.save();
    res.json({
      ok: true,
      hospitalDb
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, revisar Logs",
    });
  }
};

const updateHospital = async (req, res = response) => {
  res.json({
    ok: true,
    mgs: "updateHospital",
  });
};

const deleteHospital = async (req, res = response) => {
  res.json({
    ok: true,
    mgs: " deleteHospital",
  });
};

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
};
