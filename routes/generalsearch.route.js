const { Router } = require("express");
const { check } = require("express-validator");
const {
  getGeneralSearch,
} = require("../controllers/generalsearch.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();


router.post(
  "/:valor",
  [
    validarJwt
  ],
  getGeneralSearch
);

module.exports = router;
