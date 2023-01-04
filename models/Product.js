const {model , Schema } = require('mongoose')

const productSchema = new Schema({
    name: String,
    created_at: String,
    updated_at: String
})

module.exports = model('Product', productSchema)