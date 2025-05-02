const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    foodType: { type: String, required: true },
    quantity: { type: Number, required: true },
    expiryTime: { type: Date, required: true },
    location: { type: String, required: true },
    status: { type: String, default: "available" },
}, { timestamps: true });

module.exports = mongoose.model("Food", FoodSchema);
