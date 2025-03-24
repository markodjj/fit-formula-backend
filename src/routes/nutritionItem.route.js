const express = require("express");

const {
  getAllNutritionItems,
  getNutritionItemsByType,
  makeNutritionItem,
  makeManyNutritionItems,
  getImage,
} = require("../controllers/nutritionItem.controller.js");

const router = express.Router();

router.get("/all", getAllNutritionItems);
router.get("/", getNutritionItemsByType);
router.post("/makeItem", makeNutritionItem);
router.post("/makeManyItems", makeManyNutritionItems);
router.get("/search-image", getImage);

// router.post("/send/:id", protectRoute, sendMessage);

module.exports = router;
