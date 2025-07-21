// routes/costCentreRoutes.js
const express = require("express");
const router = express.Router();
const {
  getCostCentresByPlant,
  createCostCentre,
  updateCostCentre,
  deleteCostCentre,
} = require("../../Controllers/cost-center/costcenter");
const { authMiddleware } = require("../../Controllers/Auth/authController");

router.get("/:plantId",getCostCentresByPlant);
router.post("/",authMiddleware,  createCostCentre);
router.put("/:id",authMiddleware,   updateCostCentre);
router.delete("/:id", authMiddleware, deleteCostCentre);

module.exports = router;
