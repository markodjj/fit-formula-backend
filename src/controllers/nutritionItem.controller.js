require("dotenv").config();
const NutritionItem = require("../models/NutritionItem.js");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

const getImage = async (req, res) => {
  try {
    const { name } = req.query; // Get the image name from query params
    if (!name) return res.status(400).json({ error: "Missing image name" });

    const result = await cloudinary.search
      .expression(`resource_type:image AND filename:${name}*`)
      .execute();

    if (result.resources.length > 0) {
      res.json({ imageUrl: result.resources[0].secure_url });
    } else {
      res.status(404).json({ error: "Image not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching image", details: error.message });
  }
};

module.exports = {
  makeNutritionItem,
  makeManyNutritionItems,
  getAllNutritionItems,
  getNutritionItemsByType,
  getImage,
};
