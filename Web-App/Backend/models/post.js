const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: String, required: true },
    content: { type: String, required: true},
    imagePath: {type: String, required: true }
   
});

module.exports = mongoose.model('post', postSchema);