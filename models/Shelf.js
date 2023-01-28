const {model , Schema } = require('mongoose')

const shelfSchema = new Schema({
  raf_no: {type: String, unique: true },
  structure_id: String,
  bina_no: String,
  active: Boolean,
  created_at: String,
  updated_at: String,
})

module.exports = model('Shelf', shelfSchema)