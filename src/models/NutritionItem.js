const mongoose = require("mongoose");

const NutritionItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbohydrates: { type: Number, required: true },
  fats: { type: Number, required: true },
  type: { type: String, required: true },
  macronutrient: { type: String, required: true },
});

module.exports = mongoose.model("NutritionItem", NutritionItemSchema);
