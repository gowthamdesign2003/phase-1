const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/recipesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const recipeSchema = new mongoose.Schema({
  idMeal: { type: String, unique: true },
  title: String,
  category: String,
  area: String,
  instructions: String,
  thumbnail: String,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

// Fetch from TheMealDB
const fetchRecipesFromMealDB = async (query) => {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    const response = await axios.get(url);

    const meals = response.data.meals;
    if (!meals) return [];

    return meals.map((meal) => ({
      idMeal: meal.idMeal,
      title: meal.strMeal,
      category: meal.strCategory,
      area: meal.strArea,
      instructions: meal.strInstructions,
      thumbnail: meal.strMealThumb,
    }));
  } catch (err) {
    console.error("🌐 MealDB API fetch error:", err.message);
    return [];
  }
};

// API route
app.get("/api/recipes", async (req, res) => {
  const searchQuery = req.query.search || "";
  try {
    let recipes = await Recipe.find({
      title: { $regex: searchQuery, $options: "i" },
    });

    if (recipes.length === 0) {
      const externalRecipes = await fetchRecipesFromMealDB(searchQuery);

      if (externalRecipes.length > 0) {
        try {
          await Recipe.insertMany(externalRecipes, { ordered: false });
        } catch (err) {
          if (err.code === 11000) {
            console.warn("⚠️ Duplicate recipes skipped.");
          } else {
            console.error("❌ Insert error:", err.message);
          }
        }
        recipes = externalRecipes;
      }
    }

    res.json(recipes);
  } catch (err) {
    console.error("🔥 Internal server error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
