const express = require("express");
const router = express.Router();
const {
  getPlants,
  createPlant,
  updatePlant,
  deletePlant,
} = require("../../Controllers/plant/plantController");
const { auth, restrictTo } = require("../../middleware/authMiddleware");

router.get("/", auth, getPlants);
router.post("/", auth , createPlant);
router.put("/:id", auth,  updatePlant);
router.delete("/:id", auth, deletePlant);

module.exports = router;
