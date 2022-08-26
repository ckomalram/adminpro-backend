const{response} = require('express')
const { validationResult } = require("express-validator");

const validarCampos = (req,res=response,next)=> {
    const errorsValidation = validationResult(req);

    if (!errorsValidation.isEmpty()) {
      return res.status(400).json({
        ok: false,
        errores: errorsValidation.mapped(),
      });
    }

    next();

}

module.exports= {validarCampos}