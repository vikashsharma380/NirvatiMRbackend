const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const partyRoutes = require("./routes/partyRoutes");
const productRoutes = require("./routes/productRoutes");
const visitRoutes = require("./routes/visitRoutes");
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const tourRoutes = require("./routes/tourRoutes");
const userRoutes= require("./routes/userRoutes")


dotenv.config();

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/party", partyRoutes);
app.use("/api/products", productRoutes);
app.use("/api/visits", visitRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/tour", tourRoutes);
app.use("/api/user",userRoutes);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Nirvati Herbal MR Backend Running..."
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});