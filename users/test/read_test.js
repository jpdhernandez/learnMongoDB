// This file tests reading out from the database
const assert = require("assert");
const User = require("../src/user");

describe("Reading users from the database", () => {
    let Julian, Mary, Paul, Ezra;

    beforeEach((done) => {
        Julian = new User({ name: "Julian" });
        Mary = new User({ name: "Mary" });
        Paul = new User({ name: "Paul" });
        Ezra = new User({ name: "Ezra" });

        Promise.all([
                Julian.save(),
                Mary.save(),
                Paul.save(),
                Ezra.save()
            ])
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

    it("can skip and limit the result set", (done) => {
        User.find({})
            .sort({ name: 1 }) // orderBy name, asc
            .skip(1)
            .limit(2)
            .then((users) => {
                assert(users.length === 2);
                assert(users[0].name === "Julian");
                assert(users[1].name === "Mary");
                done();
            })
    });
});