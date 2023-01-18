const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: {type: String, default:null },
    usersurname: {type: String},
    email: {type: String, unique: true },
    phone: {type: String},
    password: {type: String },
    role:{type: String},
    token: { type: String}
});

module.exports = model('User', userSchema);