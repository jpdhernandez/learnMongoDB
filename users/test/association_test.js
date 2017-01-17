const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");
const Comment = require("../src/comment");

describe("Associations", () => {
    let Julian, blogPost, comment;

    beforeEach((done) => {
        Julian = new User({ name: "Julian" });
        blogPost = BlogPost({
            title: "Mongo is cool!",
            content: "Mongoose is fine!"
        });
        comment = new Comment({ content: "Yay, a new post!" });

        // setting associations
        Julian.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = Julian;

        Promise.all([
                Julian.save(),
                blogPost.save(),
                comment.save()
            ])
            .then(() => done());
    });

    it("saves a relation between a user and a blogpost", (done) => {
        User.findOne({ name: "Julian" })
            .populate("blogPosts") // modifier to find
            .then((user) => {
                assert(user.blogPosts[0].title === "Mongo is cool!");
                assert(user.blogPosts[0].content === "Mongoose is fine!");
                done();
            });
    });

    // test nested resources
    it("saves a full relation graph", (done) => {
        User.findOne({ name: "Julian" })
            .populate({
                path: "blogPosts",
                populate: {
                    path: "comments",
                    model: "comment",
                    populate: {
                        path: "user",
                        model: "user"
                    }
                }
            })
            .then((user) => {
                assert(user.name === "Julian");
                assert(user.blogPosts[0].comments[0].content === "Yay, a new post!");
                assert(user.blogPosts[0].comments[0].user.name === "Julian");
                done();
            });
    });
});