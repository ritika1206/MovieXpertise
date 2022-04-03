const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const movielistSchema = new Schema({
    name: { type: String, required: true, unique: true },
    movies: { type: Array, required: false },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Movielist', movielistSchema);