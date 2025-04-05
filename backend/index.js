const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const ProductRouter=require('./routes/productRouter');




require("dotenv").config();
require("./models/db");




app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;
app.get("/ping", (req, res) => {
  res.send("pong");
});
app.use("/auth", authRouter);
app.use("/products",ProductRouter);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
