const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  img: {
    type: String,
   },
  role: {
    type: String,
    require: true,
    default: 'USER_ROLE'
  },
  google: {
    type: Boolean,
    require: false
  },
});

//Para sobreescribir/ quitar un valor del schema
//Esto es para fines visuales
// no afecta el campo en la base de datos.
UserSchema.method('toJSON', function () {
  const{__v, _id, ...object} = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model('user', UserSchema);
