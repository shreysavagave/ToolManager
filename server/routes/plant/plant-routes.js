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
router.post("/",authMiddleware, createPlant);
router.put("/:id",authMiddleware, updatePlant);
router.delete("/:id",authMiddleware,  deletePlant);

module.exports = router;
