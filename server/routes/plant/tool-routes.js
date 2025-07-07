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

router.get("/:costCentreId", auth, getToolsByCostCentre);
router.post("/", auth, createTool);
router.put("/:id", auth, updateToolAge);
router.delete("/:id", auth, deleteTool);

module.exports = router;
