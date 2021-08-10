const mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", (err) => {
  console.log("error", err);
});

db.once("open", () => {
  console.log("Database has been conected!");
});
