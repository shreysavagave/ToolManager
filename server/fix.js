// fixTools.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Connect to your MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Load your Tool model
const Tool = require('./models/Tool'); // adjust path if needed

async function fixCreatedBy() {
  try {
    const result = await Tool.updateMany(
      { createdBy: { $exists: false } },
      { $set: { createdBy: '64f29e7ea71e1d4a0eaa1f4d' } } // replace with a valid user _id
    );

    console.log('Tools updated:', result);
  } catch (err) {
    console.error('Error updating tools:', err);
  } finally {
    mongoose.connection.close();
  }
}

fixCreatedBy();
