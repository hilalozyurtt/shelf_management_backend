const {model , Schema } = require('mongoose')

const shelfSchema = new Schema({
  arac: String,
  ozellik: String,
  ozellik2: String,
  oem_no: String,
  orjinal_no: String,
  raf_no: Number,
  active: Boolean,
  created_at: String,
  updated_at: String,
})

module.exports = model('Shelf', shelfSchema)