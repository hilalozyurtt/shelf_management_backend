const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: {type: String, unique: true },
    usersurname: {type: String},
    phone: {type: String},
    password: {type: String },
    role:{type: String},
    token: { type: String}
});

module.exports = model('User', userSchema);