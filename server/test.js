const auth = require("./classes/auth");

async function test() {
    if (await auth.registration("eugenekannou@icloud.com", "eugenekannou", "eugenekannou", "Eugene Kannou", "eugenekannou")) {
        console.log("test 1 passed");
    }
    else {
        console.log("test 1 failed");
    }
    if (!await auth.registration("eugenekannou@icloud.com", "eugenekannou", "eugenekannou", "Eugene Kannou", "eugenekannou")) {
        console.log("test 2 passed");
    }
    else {
        console.log("test 2 failed");
    }
}
test();