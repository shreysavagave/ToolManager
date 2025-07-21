const express = require('express')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRouter = require('./routes/Auth/auth-routes')
const plantRoutes = require("./routes/plant/plant-routes");
const costCenterRoutes = require("./routes/plant/costcenter-routes");
const toolRoutes = require("./routes/plant/tool-routes");
const checkToolLifeAndNotify = require('./Controllers/emails/notification');
require('dotenv').config()
const cron = require("node-cron");

const app = express();
const PORT = process.env.PORT;

// ✅ Use CORS once at the top with correct config
const allowedOrigins = [
  "https://tool-manager-l7rs.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
}));

app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDb connected"))
  .catch((error) => console.log(error));

console.log(process.env.SECRET_KEY);

// 🔁 Routes
app.use('/api/auth', authRouter);
app.use("/api/plants", plantRoutes);
app.use("/api/costcentres", costCenterRoutes);
app.use("/api/tools", toolRoutes);

// 🔁 Cron & Test route
cron.schedule("0 9 * * *", () => {
  console.log("Running tool life check...");
  checkToolLifeAndNotify();
});

app.get("/test-tool-life-email", async (req, res) => {
  try {
    await checkToolLifeAndNotify();
    res.json({ success: true, message: "Tool life check triggered manually." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error running check." });
  }
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
