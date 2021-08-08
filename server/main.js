require("dotenv").config();
require("./utils/dbConnect");
const server = require("./server");

server.start(process.env.PORT || 1337);
