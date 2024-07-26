const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        maxlength: 50,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 50,
        required: true,
        trim: true
    },
    username: {
        type: String,
        maxlength: 50,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        maxlength: 50,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Invalid email address'],
        trim: true
    },
    phone: {
        type: String,
        maxlength: 50,
        required: true,
        unique: true,
        trim: true
    },
    address: {
        type: String,
        maxlength: 500,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('User', UserSchema);
