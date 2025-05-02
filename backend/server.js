const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const foodRoutes = require("./routes/foodRoutes");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// const sequelize = require('./config/db');
// sequelize.sync().then(() => console.log('MySQL connected and tables synced.'));

// // Routes
 app.use("/food", foodRoutes);
app.use('/api/auth', authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
