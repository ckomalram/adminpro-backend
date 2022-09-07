const { response } = require("express");
const bcryptjs = require("bcryptjs");
const { generarJwt } = require("../helpers/jwt");
 

const fileUpload = async (req, res= response) => {

  const tipo = req.params.tipo;
  const id = req.params.id;

  const tipoPermitidos = ['hospitales', 'medicos', 'users'];

  if (!tipoPermitidos.includes(tipo)) {
   return res.status(400).json({
      ok: false,
      msg: 'Tipo enviado, no valido...',
    });    
  }
  //Validar que exista un archivo.
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: 'No files were uploaded',
    }); 
  }

  // Procesar la imagen.

  res.status(200).json({
    ok: true,
    msg: 'Endpoint upload',
  });
};

module.exports = { fileUpload };
