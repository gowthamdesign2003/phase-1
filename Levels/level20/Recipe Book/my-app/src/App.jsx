import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("chicken");

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/recipes", {
        params: { search: searchTerm },
      });
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="container">
      <h1>🍲 Recipe Finder</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for meals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={fetchRecipes}>Search</button>
      </div>

      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div className="recipe-card" key={recipe.idMeal}>
              <img
                src={
                  recipe.image ||
                  "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg"
                }
                alt={recipe.title || "Meal Image"}
                className="recipe-image"
              />
              <h3>{recipe.title}</h3>
              <p><strong>Category:</strong> {recipe.category}</p>

              {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 && (
                <>
                  <h4>Ingredients:</h4>
                  <ul>
                    {recipe.ingredients.map((ing, idx) => (
                      <li key={idx}>
                        {ing.name}: {ing.quantity}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {recipe.instructions && (
                <>
                  <h4>Instructions:</h4>
                  <p>{recipe.instructions}</p>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
