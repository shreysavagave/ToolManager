// routes/tool/toolRoutes.js
const express = require("express");
const router = express.Router();
const ToolHistory = require('../../models/ToolHistory');



const {
  getToolsByCostCentre,
  createTool,
  updateToolAge,
  deleteTool,
  getToolHistory
} = require("../../Controllers/Tool/toolController");

const { authMiddleware } = require("../../Controllers/Auth/authController");

router.get("/:costCentreId",  getToolsByCostCentre);
router.post("/",authMiddleware,  createTool);
router.put("/:id",authMiddleware,  updateToolAge);
router.delete("/:id",authMiddleware, deleteTool);

router.get("/history/:id", authMiddleware,getToolHistory);

module.exports = router;
