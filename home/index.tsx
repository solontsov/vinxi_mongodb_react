/// <reference types="vinxi/types/client" />
import React from 'react';
import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";

import "./index.css";
import { Recipe } from '../metadata/recipes';


import { RecipeForm } from './Components/RecipeForm';

function App() {

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const updateRecipesList = () => {
    fetch("/api/mongodb")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }

  const addRecipe = () => {

  }

  useEffect(() => updateRecipesList(), []);


  return (
    <div className="rec-list">
      <h2>Recipes list</h2>
      <nav>
        <button onClick={updateRecipesList}>Update</button>
        <button onClick={addRecipe}>Add</button></nav>
      <ul>
        {recipes.map((item, i) => (
          <li key={i} className="list-item">
            name = {item.name}; prepTimeInMinutes = {item.prepTimeInMinutes}
          </li>))}
      </ul>
      <RecipeForm />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
