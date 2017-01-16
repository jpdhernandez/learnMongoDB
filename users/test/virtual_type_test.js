const assert = require("assert");
const User = require("../src/user");

// Virtual types are any fields that do not get persisted in the database
// or calculated fields, derivatives
describe("Virtual types", () => {
    it("postCount returns number of posts", (done) => {
        const Julian = new User({
            name: "Julian",
            posts: [{ title: "PostTitle" }]
        });

        Julian.save()
            .then(() => User.findOne({ name: "Julian" }))
            .then((user) => {
                assert(Julian.postCount === 1);
                done();
            });
    });
});