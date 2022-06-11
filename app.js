const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");
const useAddress = require("./routes/address");
const userRouter = require("./routes/user");
//const User = require("./models/user");

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(useAddress);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(8000, () => {
  console.log("port is listening");
});
