require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/db");

const userRouter = require("./routes/user");
const useShipment = require("./routes/shipment");
const useShipper = require("./routes/shipper");
// const useServiceProvider = require("./routes/serviceprovider");
const useBankDetails = require("./routes/bankdetails");
const changepasswordRoute = require("./routes/changepassword");
const ShipmentInfo = require("./routes/shipmentInfo");
//const updateShipmentStatus = require("./routes/shipmentInfo");
const shipmentDetailRoute = require("./routes/shipmentdetails");
const app = express();

//  ******* import required models and routes to the app.js file *********//

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(changepasswordRoute);
app.use(useShipment);
app.use(useShipper);
app.use(useBankDetails);
app.use(ShipmentInfo);
//app.use(updateShipmentStatus);
app.use(shipmentDetailRoute);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(8000, () => {
  console.log("port is listening");
});
