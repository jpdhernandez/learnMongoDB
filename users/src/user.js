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
    likes: Number
});

// Set a virtual field and return length of posts field
// fat arrow function would have returned the wrong scope
UserSchema.virtual("postCount").get(function() {
    return this.posts.length;
});

// This creates a Collection of data called User and make it follow UserSchema
const User = mongoose.model("user", UserSchema);

// Export the model class called User so that it can be imported
module.exports = User;