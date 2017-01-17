const assert = require("assert");
const User = require("../src/user");

describe("Subdocuments", (done) => {

    it("can add subdocuments", (done) => {
        const Julian = new User({ name: "Julian", posts: [{ title: "First Post" }] });

        Julian.save()
            .then(() => User.findOne({ name: "Julian" }))
            .then((user) => {
                assert(user.posts[0].title === "First Post");
                done();
            })
            .catch((message) => {
                console.log(message);
            })
    });

    it("can add subdocuments to an existing record", (done) => {
        const Julian_1 = new User({ name: "Julian_1", posts: [] });

        Julian_1.save() // updating can also be done by pushing to empty array and calling save
            .then(() => User.findByIdAndUpdate(Julian_1, { posts: [{ title: "New Post" }] }))
            .then(() => User.findOne({ name: "Julian_1" }))
            .then((user) => {
                // console.log(user.posts[0]); for debugging
                assert(user.posts[0].title === "New Post");
                done();
            })
            .catch((message) => {
                console.log(message);
            })
    });

    it("can remove an existing subdocument", (done) => {
        const Julian_2 = new User({ name: "Julian_2", posts: [{ title: "Remove this Post" }] });

        Julian_2.save()
            .then(() => User.findOne({ name: "Julian_2" }))
            .then((user) => {
                user.posts[0].remove(); // does not return a promise
                return user.save();
            })
            .then(() => User.findOne({ name: "Julian_2" }))
            .then((user) => {
                assert(user.posts.length === 0);
                done();
            })
            .catch((message) => {
                console.log(message);
            })
    });
});