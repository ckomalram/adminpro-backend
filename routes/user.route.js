const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsers,
  createUser,
  updateUser,deleteUser
} = require("../controllers/user.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJwt,getUsers);
router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email  es obligatorio").not().isEmpty().isEmail(),
    validarCampos,
  ],
  createUser
);
router.put(
  "/:id",
  [
    validarJwt,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email  es obligatorio").not().isEmpty().isEmail(),
    check("role", "El rol es obligatorio").not().isEmpty(),
    validarCampos
  ],
  updateUser
);

router.delete(
  "/:id", validarJwt,
  deleteUser
);

module.exports = router;
