// This tests if User model can create and add a user to the db
const assert = require("assert");
const User = require("../src/user");

describe("Creating record", () => {
    it("saves a user", (done) => {
        const Julian = new User({ name: "Julian", age: 65 });

        Julian.save()
            .then(() => {
                //This checks if Julian saved successfully?  
                assert(!Julian.isNew);
                done();
            });
    });
});