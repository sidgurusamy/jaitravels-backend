const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path=require("path");
const { connectDB } = require("./config/db");
const enquiryRoutes = require("./routes/enquiryRoutes");
const packageRoutes = require("./routes/packageRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");


dotenv.config();
const app = express();

// Middlewares
app.use((req, res, next) => {
  const allowedOrigins = ['https://jaitravels.ca', 'https://www.jaitravels.ca'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default Route
app.get("/", (req, res) => {
    res.send("Welcome to JaiTravels!");
  });

// Routes
app.use("/api", enquiryRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api", subscriptionRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
