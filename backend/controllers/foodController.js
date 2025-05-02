const Food = require("../models/Food");

// ✅ Add Food Listing
exports.addFood = async (req, res) => {
    try {
        const { foodType, quantity, expiryTime, location } = req.body;
        const newFood = new Food({ foodType, quantity, expiryTime, location, status: "available" });
        await newFood.save();
        res.status(201).json({ message: "Food listed successfully", food: newFood });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Get Available Food Listings
exports.getAvailableFood = async (req, res) => {
    try {
        const availableFood = await Food.find({ status: "available" });
        res.status(200).json(availableFood);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Claim Food
exports.claimFood = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);

        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }

        if (food.status !== "available") {
            return res.status(400).json({ message: "Food has already been claimed or is unavailable" });
        }

        food.status = "claimed";
        food.claimedAt = new Date(); // optional: track when it was claimed
        await food.save();

        res.status(200).json({ message: "Food claimed successfully", food });
    } catch (error) {
        console.error("Claim error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};


// ✅ Get All Donations
exports.getDonations = async (req, res) => {
    try {
        const donations = await Food.find().sort({ createdAt: -1 });
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


// ✅ Delete Food Listing
exports.deleteFood = async (req, res) => {
    try {
        const food = await Food.findByIdAndDelete(req.params.id);
        if (!food) {
            return res.status(404).json({ message: "Food not found" });
        }
        res.status(200).json({ message: "Food deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
