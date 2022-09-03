const { response } = require("express");
const bcryptjs = require("bcryptjs");
const { generarJwt } = require("../helpers/jwt");

const getGeneralSearch = async (req, res) => {
  const valor = req.params.valor || "";

  res.json({
    ok: true,
    valor,
  });
};

module.exports = { getGeneralSearch };
