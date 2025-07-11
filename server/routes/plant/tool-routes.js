// routes/tool/toolRoutes.js
const express = require("express");
const router = express.Router();
const {
  getToolsByCostCentre,
  createTool,
  updateToolAge,
  deleteTool
} = require("../../Controllers/Tool/toolController");
const { auth } = require("../../middleware/authMiddleware");

router.get("/:costCentreId",  getToolsByCostCentre);
router.post("/",  createTool);
router.put("/:id",  updateToolAge);
router.delete("/:id", deleteTool);

module.exports = router;
