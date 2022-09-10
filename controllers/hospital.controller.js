const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Hospital = require("../models/hospital.model");
const { generarJwt } = require("../helpers/jwt");

const getHospitals = async (req, res = response) => {
  const hospitales = await Hospital.find().populate("user", "name img email");
  res.json({
    ok: true,
    msg: "Get Hospital",
    hospitales,
  });
};

const createHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({
    user: uid,
    ...req.body,
  });

  try {
    const hospitalDb = await hospital.save();
    res.json({
      ok: true,
      hospitalDb,
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
  try {
    const id = req.params.id;
    const uid = req.uid;
    const hospitalDB = await Hospital.findById(id);

    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        mgs: "Hospital no encontrado.",
      });
    }

    const cambiosHospital = {
      ...req.body,
      user: uid,
    };

    const hospitalActualizado = await Hospital.findByIdAndUpdate(
      id,
      cambiosHospital,
      { new: true }
    );

    res.json({
      ok: true,
      mgs: "updateHospital",
      hospital: hospitalActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, revisar Logs",
    });
  }
};

const deleteHospital = async (req, res = response) => {
  const id = req.params.id;

  try {
    const hospitalDB = await Hospital.findById(id);

    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        mgs: "Hospital no encontrado.",
      });
    }

    await Hospital.findByIdAndDelete(id);

    res.json({
      ok: true,
      mgs: "deleteHospital",
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
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
};
