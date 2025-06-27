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
app.use(cors({
  origin: 'https://jaitravels.ca',
  methods: ['GET', 'POST'],
  credentials: true
}));

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
