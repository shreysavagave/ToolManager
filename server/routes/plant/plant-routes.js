const express = require("express");
const router = express.Router();

const {
  getPlants,
  createPlant,
  updatePlant,
  deletePlant,
} = require("../../Controllers/plant/plantController");

const authMiddleware = require("../../middleware/authMiddleware");

router.get("/", getPlants);
router.post("/", createPlant);
router.put("/:id",updatePlant);
router.delete("/:id",  deletePlant);

module.exports = router;
