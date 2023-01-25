const {model , Schema } = require('mongoose')

const productSchema = new Schema({
    name: String,
    arac: String,
    ozellik: String,
    ozellik2: String,
    oem_no: String,
    orjinal_no: String,
    shelf_id: String,
    raf_no: String,
    active: Boolean,
    created_at: String,
    updated_at: String
})

module.exports = model('Product', productSchema)