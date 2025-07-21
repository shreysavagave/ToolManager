const ToolHistory = require('../../models/ToolHistory');
const Tool = require('../../models/Tool');
const User = require('../../models/User');

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
      currentAge: 0,
      createdBy: req.user.id // 👈 Add this if you want to track the user who created it
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

    // If supervisor sets age to 0, store previous history
    if (typeof currentAge === "number" && currentAge === 0 && tool.currentAge !== 0) {
      const lastHistory = await ToolHistory.find({ toolId: tool._id }).sort({ serialNo: -1 }).limit(1);
      const serialNo = lastHistory.length > 0 ? lastHistory[0].serialNo + 1 : 1;

      await ToolHistory.create({
        toolId: tool._id,
        serialNo,
        previousValue: { currentAge: tool.currentAge },
        updatedBy: req.user.id, 
        action: 'updated',// assuming req.user is available via auth middleware
      });
    }

    // Update tool values
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

exports.getToolHistory = async (req, res) => {
  try {
    const history = await ToolHistory.find({ toolId: req.params.id })
    .populate({ path: 'updatedBy', select: 'username', options: { strictPopulate: false } })

      .sort({ serialNo: -1 });

    res.json({ success: true, data: history });
  } catch (err) {
    console.error("🔴 Error in getToolHistory:", err); // log the full error
    res.status(500).json({ success: false, error: err.message });
  }
};