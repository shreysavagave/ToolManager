const CostCentre = require('../../models/CostCenter');
const Plant = require('../../models/Plant');
const Tool = require('../../models/Tool');

const getPlants = async (req, res) => {
  try {
    const plants = await Plant.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: plants.length,
      data: plants
    });
  } catch (err) {
    console.error('Error fetching plants:', err);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching plants'
    });
  }
};

const createPlant = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Plant name is required and must be a valid string'
      });
    }

    const plant = new Plant({
      name: name.trim(),
      createdBy: req.user.id
    });

    await plant.save();

    res.status(201).json({
      success: true,
      data: plant
    });
  } catch (err) {
    console.error('Error creating plant:', err);
    res.status(500).json({
      success: false,
      error: 'Server error while creating plant'
    });
  }
};

const updatePlant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Plant name is required and must be a valid string'
      });
    }

    const updatedPlant = await Plant.findByIdAndUpdate(
      id,
      { name: name.trim() },
      { new: true, runValidators: true }
    );

    if (!updatedPlant) {
      return res.status(404).json({
        success: false,
        error: `Plant not found with id ${id}`
      });
    }

    res.status(200).json({
      success: true,
      data: updatedPlant
    });
  } catch (err) {
    console.error('Error updating plant:', err);
    res.status(500).json({
      success: false,
      error: 'Server error while updating plant'
    });
  }
};

const deletePlant = async (req, res) => {
  const { id } = req.params;

  try {
    const plant = await Plant.findById(id);
    if (!plant) return res.status(404).json({ success: false, error: "Plant not found" });

    // 1. Get all cost centres for this plant
    const costCentres = await CostCentre.find({ plantId: id });

    // 2. Get the costCentre IDs before deleting them
    const costCentreIds = costCentres.map((cc) => cc._id.toString());

    // 3. Delete all tools associated with these cost centres
    await Tool.deleteMany({ costCentreId: { $in: costCentreIds } });

    // 4. Delete cost centres
    await CostCentre.deleteMany({ plantId: id });

    // 5. Delete the plant
    await Plant.findByIdAndDelete(id);

    res.json({ success: true, message: "Plant, cost centres, and tools deleted successfully." });
  } catch (error) {
    console.error("Error deleting plant and related data:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};


module.exports = {
  getPlants,
  createPlant,
  updatePlant,
  deletePlant
};


