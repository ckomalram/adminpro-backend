const { response } = require("express");
const bcryptjs = require("bcryptjs");
const { generarJwt } = require("../helpers/jwt");
const { v4: uuidv4 } = require("uuid");

const fileUpload = async (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  const tipoPermitidos = ["hospitales", "medicos", "users"];

  if (!tipoPermitidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "Tipo enviado, no valido...",
    });
  }
  //Validar que exista un archivo.
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No files were uploaded",
    });
  }

  // Procesar la imagen.

  const file = req.files.imagen;
  const nombreCortado = file.name.split(".");
  const extensionFile = nombreCortado[nombreCortado.length - 1].toLowerCase();

  // Validar Extension file
  const extensionPermitidas = ["png", "jpg", "jpeg", "gif"];

  if (!extensionPermitidas.includes(extensionFile)) {
    return res.status(400).json({
      ok: false,
      msg: "extension de archivo no valida...",
    });
  }

  // Generar nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extensionFile}`;

  // Crear path para guardar la imagen.
  const uploadPath = `./uploads/${tipo}/${nombreArchivo}`;

  // Mover la imagen a una ruta especifica.
  file.mv(uploadPath, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: 'Error al mover la imagen',
      });
    }

    res.status(200).json({
      ok: true,
      msg: "Endpoint upload",
      nombreArchivo,
      uploadPath,
    });
  });
};

module.exports = { fileUpload };
