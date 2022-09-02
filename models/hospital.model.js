const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
  name: {
    type: String,
    require: true
  },
  img: {
    type: String,
   },
   user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'user'
   }
}, {collection: 'hospitales'});

//Para sobreescribir/ quitar un valor del schema
//Esto es para fines visuales
// no afecta el campo en la base de datos.
HospitalSchema.method('toJSON', function () {
  const{__v,   ...object} = this.toObject();
 
  return object;
});

module.exports = model('hospital', HospitalSchema);
