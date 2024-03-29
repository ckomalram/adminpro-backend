const { Router } = require("express");

const {
  getMedicos,
  createMedico,
  updateMedico,
  deleteMedico,
} = require("../controllers/medico.controller");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", getMedicos);
router.post("/", [
  validarJwt,
  check("name", "El nombre de Medico es obligatorio").not().isEmpty(),
  check("hospital", "El id del hospital debe ser valido.").isMongoId(),
  validarCampos
], createMedico);
router.put("/:id", [validarJwt,
  check("name", "El nombre de hospital es obligatorio").not().isEmpty(),
  check("hospital", "El id del hospital debe ser valido.").isMongoId(),
  validarCampos
], updateMedico);

router.delete("/:id",[validarJwt], deleteMedico);

module.exports = router;
