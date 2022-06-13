require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/db");

const useAddress = require("./routes/address");
const userRouter = require("./routes/user");
const useShipment = require("./routes/shipment");

const app = express();
// const connection = require("./models/db");
const changepasswordRoute = require("./routes/changepassword");
// const User = require("./models/user");

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(changepasswordRoute);

// const test = async (email, password) => {
//   const user = await User.findOne({ email: email });
//   const result = await user.comparePassword(password);
//   console.log(result);
// };

// test('niraj@email.com', 'niraj12');
app.use(useAddress);
app.use(useShipment);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(8000, () => {
  console.log("port is listening");
});
