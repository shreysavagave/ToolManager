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


mongoose.connect("mongodb+srv://shreysavagave:MechProject@cluster0.dxmcu9a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log("MongoDb connected"))
.catch((error)=>{console.log(error)});

console.log(process.env.SECRET_KEY) 
const app = express()
const PORT = process.env.PORT || 5000;
const cron = require("node-cron");

app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend origin
  credentials: true,               // ✅ allow cookies
}));



// Run every day at 9 AM
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





app.use(
  cors({
    origin:'http://localhost:5173',
    methods:['POST','GET','DELETE','PUT'],
    allowedHeaders:[
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma"
    ],
    credentials:true
  })
);

app.use(express.json());
app.use('/api/auth', authRouter)
app.use("/api/plants", plantRoutes);
app.use("/api/costcentres", costCenterRoutes);
app.use("/api/tools", toolRoutes);
app.listen(PORT,()=>{
  console.log(`running on port ${PORT}`)
})