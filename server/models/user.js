const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refreshTokens: {
        type: Array,
        default: []
    }
});


const User = model('auth', UserSchema);

module.exports = User;