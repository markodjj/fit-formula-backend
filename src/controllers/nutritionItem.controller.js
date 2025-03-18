const NutritionItem = require("../models/NutritionItem.js");

const makeNutritionItem = async (req, res) => {
  try {
    const newNutritionItem = new NutritionItem(req.body);
    const savedNutritionItem = await newNutritionItem.save();
    res.status(201).json(savedNutritionItem);
  } catch (error) {
    console.error("Error making NutritionItem:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const makeManyNutritionItems = async (req, res) => {
  try {
    const savedNutritionItems = await NutritionItem.insertMany(req.body);
    res.status(201).json(savedNutritionItems);
  } catch (error) {
    console.error("Error maing many NutritionItems:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllNutritionItems = async (req, res) => {
  try {
    const { type, search } = req.query;

    let query = {};

    if (type) query.type = type;
    if (search) query.name = { $regex: search, $options: "i" }; // Case-insensitive search

    const NutritionItems = await NutritionItem.find(query);
    res.json(NutritionItems);
  } catch (error) {
    console.error("Error fetching NutritionItems:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getNutritionItemsByType = async (req, res) => {
  // try {
  //   const { type } = req.query;
  //   console.log(type);
  //   let query = {};

  //   if (type) query.type = type;
  //   // if (search) query.name = { $regex: search, $options: "i" }; // Case-insensitive search

  //   const NutritionItems = await NutritionItem.find(type);
  //   res.json(NutritionItems);
  // } catch (error) {
  //   console.error("Error fetching NutritionItems:", error);
  //   res.status(500).json({ error: "Server error" });
  // }
  try {
    const { type, search } = req.query;

    let query = {};

    if (type) query.type = { $regex: type, $options: "i" };
    if (search) query.name = { $regex: search, $options: "i" }; // Case-insensitive search

    const foods = await NutritionItem.find(query);
    res.json(foods);
  } catch (error) {
    console.error("Error fetching food:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  makeNutritionItem,
  makeManyNutritionItems,
  getAllNutritionItems,
  getNutritionItemsByType,
};
