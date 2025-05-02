const express = require("express");
const { addFood, getAvailableFood, claimFood, getDonations, deleteFood } = require("../controllers/foodController");

const router = express.Router();

router.post("/add", addFood);
router.get("/available", getAvailableFood);
router.put("/claim/:id", claimFood);
router.get("/donations", getDonations);
router.delete("/deletefood/:id", deleteFood);
module.exports = router;
