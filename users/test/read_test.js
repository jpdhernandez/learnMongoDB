// This file tests reading out from the database
const assert = require("assert");
const User = require("../src/user");

describe("Reading users from the database", () => {
    let Julian;

    beforeEach((done) => {
        Julian = new User({ name: "Julian" });
        Julian.save()
            .then(() => done());
    });

    it("finds all users with name of Julian", (done) => {
        User.find({ name: "Julian" })
            .then((users) => {
                assert(Julian._id.toString() === users[0]._id.toString()); // convert from objectId to string to compare
                done();
            });
    });

    it("find a user with a particular id", (done) => {
        User.findOne({ _id: Julian._id })
            .then((user) => {
                assert(user.name === "Julian");
                done();
            });
    });
});