const fs = require("fs");

const User = require("../models/user.model");
const Hospital = require("../models/hospital.model");
const Medico = require("../models/medico.model");

const updatePhoto = async (tipo, id,  nombreArchivo) => {
  switch (tipo) {
    case "users":
      break;
    case "medicos":
      const medico = await Medico.findById(id);
      if (!medico) {
        console.log("Id no encontrado para medico");
        return false;
      }

      const pathViejo = `./uploads/medicos/${medico.img}`;
      //borrar imagen anterior si existe.
      if (fs.existsSync(pathViejo)) {
        fs.unlinkSync(pathViejo);
      }
      medico.img = nombreArchivo;
      await medico.save();
      return true;
 
    case "hospitales":
      break;

    default:
      break;
  }

  // console.log('vamos bien...');
};

module.exports = {
  updatePhoto,
};
