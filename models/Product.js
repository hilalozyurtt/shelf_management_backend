const {model , Schema } = require('mongoose')

const productSchema = new Schema({
    name: String,
    arac: String,
    ozellik: String,
    ozellik2: String,
    oem_no: String,
    orjinal_no: String,
    ek_alan_1: String,
    ek_alan_2: String,
    ek_alan_3: String,
    ek_alan_4: String,
    shelf_id: String,
    active: Boolean,
    created_at: String,
    updated_at: String
})

module.exports = model('Product', productSchema)