const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    content: String,
    comments: [{ // config object
        type: Schema.Types.ObjectId, // points to a diff record in a diff collection
        ref: "comment" // model name pointing to the other col
    }]
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;