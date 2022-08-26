const { Router } = require("express");
const { check } = require('express-validator');
const { getUsers, createUser } = require("../controllers/user.controller");
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get("/", getUsers);
router.post("/", [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email  es obligatorio').not().isEmpty().isEmail(),
    validarCampos
], createUser);

module.exports = router;
