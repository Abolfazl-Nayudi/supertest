const { Schema, model } = require('mongoose');

const emailVerificationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiresDate: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 60 * 60 * 1000), // Set to one hour from now
    index: { expires: '1h' }, // Expire documents after one hour
  },
});

module.exports = model('VerifyEmail', emailVerificationSchema);
