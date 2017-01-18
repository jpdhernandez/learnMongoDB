const mongoose = require("mongoose");
const PostSchema = require("./post_schema");
const Schema = mongoose.Schema;

// This defines the structure/ blueprint of a user
const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: "Name must be longer than 2 characters."
        },
        required: [true, "Name is required."]
    },
    age: Number,
    salary: Number,
    posts: [PostSchema], // embedded subdocument
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: "blogPost"
    }]
});

// Set a virtual field and return length of posts field
// fat arrow function would have returned the wrong scope
UserSchema.virtual("postCount").get(function(next) {
    return this.posts.length;
});

UserSchema.pre("remove", function(next) {
    const BlogPost = mongoose.model("blogPost");
    // this === instance of a user

    // go through all the records in the blogpost Collection
    // look at their ids and if the id is in the array,
    // remove it
    BlogPost.remove({ _id: { $in: this.blogPosts } })
        .then(() => next()); // call next middleware after removal
});

// This creates a Collection of data called User and make it follow UserSchema
const User = mongoose.model("user", UserSchema);

// Export the model class called User so that it can be imported
module.exports = User;