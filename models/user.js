const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firebase_uuid: {
        type: String,
        required: true
    },
});

userSchema.virtual('auth_token_payload').get(function () {
    return { _id: this._id };
});

module.exports = mongoose.model('User', userSchema);