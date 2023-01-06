const {model , Schema } = require('mongoose')

const roomSchema = new Schema({
    oda_no: String,
    structure_id: String,
    created_at: String,
    updated_at: String
})

module.exports = model('Room', roomSchema)