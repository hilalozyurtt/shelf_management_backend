const { model, Schema } = require('mongoose');

const systemParamsSchema = new Schema({
  key: String,
  value: Boolean,
  variable: String,
  active: Boolean,
  table: String,
  created_at: String,
  updated_at: String
});

module.exports = model('System_param', systemParamsSchema);