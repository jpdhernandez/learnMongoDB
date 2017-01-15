const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// This defines the structure/ blueprint of a user
const UserSchema = new Schema({
    name: String,
    age: Number
});

// This creates a Collection of data called User and make it follow UserSchema
const User = mongoose.model("user", UserSchema);

// Export the model class called User so that it can be imported
module.exports = User;