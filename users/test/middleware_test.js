const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe("Middleware", () => {
    let Julian, blogPost;

    beforeEach((done) => {
        Julian = new User({ name: "Julian" });
        blogPost = BlogPost({
            title: "Mongo is cool!",
            content: "Mongoose is fine!"
        });

        // setting associations
        Julian.blogPosts.push(blogPost);

        Promise.all([
                Julian.save(),
                blogPost.save(),
            ])
            .then(() => done());
    });

    it("users clean updangling blogposts on remove", (done) => {
        Julian.remove()
            .then(() => BlogPost.count())
            .then((count) => {
                assert(count === 0);
                done();
            });
    });
});