/**
 * Route: api/upload
 */

const { Router } = require("express");
const expressFileUpload = require('express-fileupload');


const { validarJwt } = require("../middlewares/validar-jwt");
const {fileUpload} = require('../controllers/upload.controller')
const router = Router();

 router.use(expressFileUpload());

router.put("/:tipo/:id", [validarJwt],
fileUpload
);

module.exports = router;
