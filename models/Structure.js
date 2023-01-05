const {model , Schema } = require('mongoose')

const structureSchema = new Schema({
    bina_no: String,
    active: Boolean,
    created_at: String,
    updated_at: String
})

module.exports = model('Structure', structureSchema)