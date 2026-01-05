const express = require("express");
const router = express.Router();
const FoodItem = require("../Model/FoodItemSchema"); // path sahi rakhna

router.post("/add-food", async (req, res) => {
  try {
    const { CategoryName, name, img, options } = req.body;

    if (!CategoryName || !name || !img || !options) {
      return res.status(400).json({ error: "All fields required" });
    }

    const foodItem = new FoodItem({
      CategoryName,
      name,
      img,
      options: {
        small: options.small,
        medium: options.medium,
        full: options.full
      }
    });

    await foodItem.save();

    res.status(201).json({
      success: true,
      message: "Food item added successfully",
      data: foodItem
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
