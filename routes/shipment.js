const express = require("express");

const router = express.Router();
const {
  createShipment,
  getAllShipments,
  getCollections,
  getUsers,
  getDelivered,
  getOutForDelivery,
  getRescheduled,
  getSummary,
  getFailToDelivery ,
} = require("../controllers/shipment");
router.post("/createsh", createShipment);
router.get("/shipments", getAllShipments);
router.get("/collections", getCollections);
router.get("/users", getUsers);
router.get("/delivered", getDelivered);
router.get("/outfordelivery", getOutForDelivery);
router.get("/rescheduled", getRescheduled);
router.get("/summary", getSummary);
router.get("/failtodelivery", getFailToDelivery);

module.exports = router;