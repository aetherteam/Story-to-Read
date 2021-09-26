require("dotenv").config();
const server = require("./server");

server.start(process.env.PORT || 1337);
