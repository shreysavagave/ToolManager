const CostCentre = require('../../models/CostCenter');
const Plant = require('../../models/Plant');
const Tool = require('../../models/Tool');

const getPlants = async (req, res) => {
  try {
    const plants = await Plant.find().sort({ createdAt: -1 }); // Fetch all, no filtering
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

// POST: Create a new plant
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
      createdBy: req.user.id // track who created the plant
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

// PUT: Update a plant
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

    const plant = await Plant.findOne({ _id: id, createdBy: req.user.id });
    if (!plant) {
      return res.status(404).json({
        success: false,
        error: 'Plant not found or not authorized'
      });
    }

    plant.name = name.trim();
    await plant.save();

    res.status(200).json({
      success: true,
      data: plant
    });
  } catch (err) {
    console.error('Error updating plant:', err);
    res.status(500).json({
      success: false,
      error: 'Server error while updating plant'
    });
  }
};

// DELETE: Delete plant and related data
const deletePlant = async (req, res) => {
  const { id } = req.params;

  try {
    const plant = await Plant.findById(id); // Removed createdBy condition
    if (!plant) {
      return res.status(404).json({ success: false, error: 'Plant not found' });
    }

    // 1. Get cost centres of the plant
    const costCentres = await CostCentre.find({ plantId: id });
    const costCentreIds = costCentres.map(cc => cc._id.toString());

    // 2. Delete tools
    await Tool.deleteMany({ costCentreId: { $in: costCentreIds } });

    // 3. Delete cost centres
    await CostCentre.deleteMany({ plantId: id });

    // 4. Delete plant
    await Plant.findByIdAndDelete(id);

    res.json({ success: true, message: 'Plant, cost centres, and tools deleted successfully.' });
  } catch (error) {
    console.error('Error deleting plant and related data:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};


module.exports = {
  getPlants,
  createPlant,
  updatePlant,
  deletePlant
};

