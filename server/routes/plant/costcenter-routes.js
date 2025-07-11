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

router.get("/:plantId", getCostCentresByPlant);
router.post("/",  createCostCentre);
router.put("/:id",   updateCostCentre);
router.delete("/:id",  deleteCostCentre);

module.exports = router;
