const jwt = require("jsonwebtoken");

const generarJwt = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };

    jwt.sign(
      payload,
      process.env.JWTSECRET,
      {
        expiresIn: "1h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("No se pudo generar JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generarJwt };
