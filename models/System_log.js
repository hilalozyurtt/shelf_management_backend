const { model, Schema } = require('mongoose');

const systemLogSchema = new Schema({
    user_id: String,
    user_name: String,
    changed_value: String,
    changed_id: String,
    action: String,
    created_at: String,
    updated_at: String
});

module.exports = model('System_log', systemLogSchema);