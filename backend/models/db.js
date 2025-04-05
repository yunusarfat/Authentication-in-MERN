const mongoose = require("mongoose");
const mongo_url = process.env.MONGO_CONN;
mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("database is not connected", err);
  });
