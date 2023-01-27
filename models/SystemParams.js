const { model, Schema } = require('mongoose');

const systemParamsSchema = new Schema({
  key: String,
  value: Boolean,
  variable: String,
  active: Boolean,
  created_at: String,
  updated_at: String
});

module.exports = model('System_param', systemParamsSchema);