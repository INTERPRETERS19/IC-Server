require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connection = require("./models/db");

//  ******* import required models and routes to the app.js file *********//
const userRouter = require("./routes/user");
const changepasswordRoute = require("./routes/changepassword");
const User = require("./models/user");

// app.use((req, res, next) => {
//   req.on('data', chunk => {
//     const data = JSON.parse(chunk);
//     req.body = data;
//     next();
//   });
// });

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

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(8000, () => {
  console.log("port is listening");
});
