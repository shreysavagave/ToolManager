const CostCentre = require("../../models/CostCenter");

exports.getCostCentresByPlant = async (req, res) => {
  try {
    const centres = await CostCentre.find({ plantId: req.params.plantId });
    res.status(200).json({
      success: true,
      data: centres
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createCostCentre = async (req, res) => {
  try {
    const centre = new CostCentre({
      name: req.body.name,
      plantId: req.body.plantId,
    });
    await centre.save();
    res.status(201).json({
      success: true,
      data: centre
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateCostCentre = async (req, res) => {
  try {
    const centre = await CostCentre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    res.json(centre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCostCentre = async (req, res) => {
  try {
    await CostCentre.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Cost Centre deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};