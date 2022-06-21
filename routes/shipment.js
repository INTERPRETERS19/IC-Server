const express = require("express");

const router = express.Router();
const {
  createShipment,
  getAllShipments,
  getCollections,
  getUsers,
  getAllReturns,
  getAllNewShipments,
} = require("../controllers/shipment");
router.post("/createsh", createShipment);
router.get("/shipments", getAllShipments);
router.get("/collections/:id", getCollections);
router.get("/users", getUsers);
router.get("/returns", getAllReturns);
router.get("/newships", getAllNewShipments);

module.exports = router;
