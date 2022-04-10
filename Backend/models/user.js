const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    uname: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    // movielists: [{ type: Schema.Types.ObjectId, ref: 'Movielist' }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);