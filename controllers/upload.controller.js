const path = require("path");
const fs = require("fs");
const { response } = require("express");
const bcryptjs = require("bcryptjs");

const { generarJwt } = require("../helpers/jwt");
const { v4: uuidv4 } = require("uuid");
const { updatePhoto } = require("../helpers/updatePhoto");

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
        msg: "Error al mover la imagen",
      });
    }

    //Actualizar file en base de datos
    updatePhoto(tipo, id, nombreArchivo);

    res.status(200).json({
      ok: true,
      msg: "Endpoint upload",
      nombreArchivo,
      uploadPath,
    });
  });
};

const obtenerImagen = (req, res = response) => {
  const tipo = req.params.tipo;
  const foto = req.params.foto;

  const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

  //imagen por defecto
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImg);
  }
};

module.exports = { fileUpload, obtenerImagen };
