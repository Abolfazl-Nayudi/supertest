const { Schema, model } = require('mongoose');
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required!!'],
  },
  email: {
    type: String,
    required: [true, 'email is required!!'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  password: {
    type: String,
    required: [true, 'password is required!!'],
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

module.exports = model('User', UserSchema);
