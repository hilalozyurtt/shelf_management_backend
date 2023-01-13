const {model , Schema } = require('mongoose')

const shelfSchema = new Schema({
  raf_no: String,
  structure_id: String,
  active: Boolean,
  created_at: String,
  updated_at: String,
})

module.exports = model('Shelf', shelfSchema)