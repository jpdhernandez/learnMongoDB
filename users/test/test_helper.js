/*eslint no-console:0*/
const mongoose = require("mongoose"); // code sharing in a node env

mongoose.Promise = global.Promise; // use ES6 promise

// execute one time
before((done) => {
    mongoose.connect("mongodb://localhost/users_test"); // conn to db user_test
    mongoose.connection // event handlers
        .once("open", () => {
            console.log("Good to go!");
            done(); // inform mocha we are ready to test
        })
        .on("error", (error) => {
            console.warn("Warning", error);
        });
});

// Drop records before creating connection (hook)
beforeEach((done) => {
    const { users, blogposts, comments } = mongoose.connection.collections;
    users.drop(() => { // signals that you're done with drop then move on to next task
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            });
        });
    });
});