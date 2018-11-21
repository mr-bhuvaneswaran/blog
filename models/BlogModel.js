const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const BlogSchema =  new Schema({
    author: String,
    date: Date,
    image:String,
    likes: Number,
    title: String,
    context: String,
    comments: Array,
    dislikes: Number,
    uid: String
});

module.exports = Blog = mongoose.model('blog', BlogSchema);