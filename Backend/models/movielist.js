const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const movielistSchema = new Schema({
    name: { type: String, required: true },
    visibility: { type: String, required: true },
    movies: { type: Array, required: false },
    userId: { type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Movielist', movielistSchema);