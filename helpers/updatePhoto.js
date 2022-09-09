const fs = require("fs");

const User = require("../models/user.model");
const Hospital = require("../models/hospital.model");
const Medico = require("../models/medico.model");

const updatePhoto = async (tipo, id, nombreArchivo) => {
  let pathViejo='';
  switch (tipo) {
    case "users":
      const user = await User.findById(id);
      if (!user) {
        console.log("Id no encontrado para user");
        return false;
      }

      pathViejo = `./uploads/users/${user.img}`;
      deletePhoto(pathViejo);

      user.img = nombreArchivo;
      await user.save();
      return true;
    case "medicos":
      const medico = await Medico.findById(id);
      if (!medico) {
        console.log("Id no encontrado para medico");
        return false;
      }

      pathViejo = `./uploads/medicos/${medico.img}`;
      deletePhoto(pathViejo);

      medico.img = nombreArchivo;
      await medico.save();
      return true;

    case "hospitales":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log("Id no encontrado para hospital");
        return false;
      }

      pathViejo = `./uploads/hospitales/${hospital.img}`;
      deletePhoto(pathViejo);

      hospital.img = nombreArchivo;
      await hospital.save();
      return true;
    default:
      break;
  }

  // console.log('vamos bien...');
};

const deletePhoto = (path) => {
  //borrar imagen anterior si existe.
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};
module.exports = {
  updatePhoto,
};
