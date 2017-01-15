// This file tests deleting data from database
const assert = require("assert");
const User = require("../src/user");

describe("Deleting a user", () => {
    let Julian;

    beforeEach((done) => {
        Julian = new User({ name: "Julian", age: 65 });
        Julian.save()
            .then(() => done());
    });

    it("model instance remove", (done) => {
        Julian.remove() // remove one specific user
            .then(() => User.findOne({ name: "Julian" }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it("class method remove", (done) => {
        User.remove({ name: "Julian" }) // remove all users that have name property
            .then(() => User.findOne({ name: "Julian" }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    // remove the first record that matches the criteria
    it("class method findOneAndRemove", (done) => {
        User.findOneAndRemove({ name: "Julian" })
            .then(() => User.findOne({ name: "Julian" }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it("class method findByIdAndRemove", (done) => {
        User.findByIdAndRemove(Julian._id) // doesn't need to be key/val pair
            .then(() => User.findOne({ name: "Julian" }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

});