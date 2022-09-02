const { Router } = require("express");

const {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospital.controller");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", getHospitals);
router.post("/", [], createHospital);
router.put("/:id", [], updateHospital);

router.delete("/:id", deleteHospital);

module.exports = router;
