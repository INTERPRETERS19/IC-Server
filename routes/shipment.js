const express = require("express");

const router = express.Router();
const {
  createShipment,
  getAllShipments,
  getCollections,
  getUsers,
  getDeliveryfee,
  getDelivered,
  getOutForDelivery,
  getRescheduled,
  getSummary,
  getFailToDelivery,
  getPickUp,
} = require("../controllers/shipment");

router.post("/createsh", createShipment);
router.get("/shipments", getAllShipments);
router.get("/collections/:id", getCollections);
router.get("/deliveryfee/:id", getDeliveryfee);
router.get("/users", getUsers);
router.get("/delivered/:id", getDelivered);
router.get("/outfordelivery/:id", getOutForDelivery);
router.get("/pickup/:id", getPickUp);
router.get("/rescheduled/:id", getRescheduled);
router.get("/summary/:id", getSummary);
router.get("/failtodelivery/:id", getFailToDelivery);
router.get("/pickup/:id", getPickUp);

module.exports = router;
