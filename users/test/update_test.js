const assert = require("assert");
const User = require("../src/user");

describe("Updating records", () => {
    let Julian;

    beforeEach((done) => {
        Julian = new User({ name: "Julian", age: 65, likes: 0, salary: 100000 });
        Julian.save()
            .then(() => done());
    });

    function assertAge(operation, age, done) {
        operation
            .then(() => User.findById(Julian._id))
            .then((user) => {
                assert(user.age === age);
                done();
            })
    }

    it("An instance type can set and save", (done) => {
        Julian.set('age', 18)
        assertAge(Julian.save(), 18, done);
    });

    it("A model instance can update", (done) => {
        assertAge(Julian.update({ age: 19 }), 19, done);
    });

    it("A model class can update", (done) => {
        assertAge(User.update({ name: "Julian" }, { age: 20 }), 20, done);
    });

    it("A model class can update one record", (done) => {
        assertAge(User.findOneAndUpdate({ name: "Julian" }, { age: 21 }), 21, done);
    });

    it("A model class can find a record with an Id and update", (done) => {
        assertAge(User.findByIdAndUpdate(Julian._id, { age: 23 }), 23, done);
    });

    // Use update operator to increment likes
    it("A user can have their likes incremented by $inc", (done) => {
        User.update({ name: "Julian" }, { $inc: { likes: 50 } })
            .then(() => User.findOne({ name: "Julian" }))
            .then((user) => {
                assert(user.likes === 50);
                done();
            });
    });

    it("A user can have their salary increased by $mul", (done) => {
        User.update({ name: "Julian" }, { $mul: { salary: 1.10 } })
            .then(() => User.findOne({ name: "Julian" }))
            .then((user) => {
                assert(parseInt(user.salary) === 110000);
                done();
            });
    });
});