const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({
  name: {
    type: String,
    require: true
  },
  img: {
    type: String,
   },
   user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
   },
   hospital: {
    type: Schema.Types.ObjectId,
    ref: 'hospital',
    required: true
   }
} );

//Para sobreescribir/ quitar un valor del schema
//Esto es para fines visuales
// no afecta el campo en la base de datos.
MedicoSchema.method('toJSON', function () {
  const{__v,   ...object} = this.toObject();
 
  return object;
});

module.exports = model('medico', MedicoSchema);
