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
  getFailToDelivery,
} = require("../controllers/shipment");

router.post("/createsh", createShipment);
router.get("/shipments", getAllShipments);
router.get("/collections/:id", getCollections);
router.get("/users", getUsers);
router.get("/delivered/:id", getDelivered);
router.get("/outfordelivery/:id", getOutForDelivery);
router.get("/rescheduled/:id", getRescheduled);
router.get("/summary/:id", getSummary);
router.get("/failtodelivery/:id", getFailToDelivery);

module.exports = router;
