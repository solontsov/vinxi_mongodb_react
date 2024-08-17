/// <reference types="vinxi/types/client" />
import React from 'react';
import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";

import "./index.css";

import { Recipe } from '../metadata/recipes';


import { RecipeForm } from './Components/RecipeForm';
import { RecipeList } from './Components/RecipeList';



function App() {

  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [buttonClicked, setButtonClicked] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const updateRecipes = () => {

    console.log('update')
    fetch("/api/mongodb")
      .then((res) => res.json())
      .then((data) => setRecipes(data));

  }
  useEffect(() => {
    if (buttonClicked !== 'cancel') {
      updateRecipes();
    }
  }, [buttonClicked]);

  return (
    <>
      {showRecipeForm ? (
        <RecipeForm setShowRecipeForm={setShowRecipeForm} setButtonClicked={setButtonClicked} />
      ) : (
        <RecipeList setShowRecipeForm={setShowRecipeForm} buttonClicked={buttonClicked} updateRecipes={updateRecipes} recipes={recipes} />
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
