// controllers/tool/toolController.js
const Tool = require('../../models/Tool');

exports.getToolsByCostCentre = async (req, res) => {
  try {
    const tools = await Tool.find({ costCentreId: req.params.costCentreId });
    res.json({ success: true, data: tools });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createTool = async (req, res) => {
  try {
    const { name, lifeSpan, costCentreId } = req.body;

    const newTool = new Tool({
      name,
      lifeSpan,
      costCentreId,
      currentAge: 0, // default value
    });

    await newTool.save();
    res.status(201).json({ success: true, data: newTool });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateToolAge = async (req, res) => {
  try {
    const { currentAge, lifeSpan } = req.body;

    const tool = await Tool.findById(req.params.id);
    if (!tool) return res.status(404).json({ success: false, error: "Tool not found" });

    if (typeof currentAge === "number") tool.currentAge = currentAge;
    if (typeof lifeSpan === "number") tool.lifeSpan = lifeSpan;

    await tool.save();
    res.json({ success: true, data: tool });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.deleteTool = async (req, res) => {
  try {
    await Tool.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Tool deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
