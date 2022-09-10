const { Router } = require("express");
const { login,loginWithGoogle,renewToken } = require("../controllers/auth.controller");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();

router.post("/", [
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email  es obligatorio").not().isEmpty().isEmail(),
    validarCampos,
], login);


router.post("/google", [
    check("token", "El token de google es obligatorio").not().isEmpty(),
    validarCampos,
], loginWithGoogle);

router.get("/renew", [
    validarJwt
], renewToken);
module.exports = router;
