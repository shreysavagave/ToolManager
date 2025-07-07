// routes/costCentreRoutes.js
const express = require("express");
const router = express.Router();
const {
  getCostCentresByPlant,
  createCostCentre,
  updateCostCentre,
  deleteCostCentre,
} = require("../../Controllers/cost-center/costcenter");
const { auth, restrictTo } = require("../../middleware/authMiddleware");

router.get("/:plantId", auth, getCostCentresByPlant);
router.post("/", auth, createCostCentre);
router.put("/:id", auth,  updateCostCentre);
router.delete("/:id", auth, deleteCostCentre);

module.exports = router;
