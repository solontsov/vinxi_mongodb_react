/// <reference types="vinxi/types/client" />
import React from 'react';
import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";

import "./index.css";
import { Recipe } from '../metadata/recipes';


import { RecipeForm } from './Components/RecipeForm';

//visibility test
const ComponentA = ({ switchToB }) => (
  <div>
    <h1>Component A</h1>
    <button onClick={switchToB}>Switch to Component B</button>
  </div>
);

const ComponentB = ({ switchToA }) => (
  <div>
    <h1>Component B</h1>
    <button onClick={switchToA}>Switch to Component A</button>
  </div>
);

function App() {

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const updateRecipesList = () => {
    fetch("/api/mongodb")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }

  const addRecipe = () => {

  }

  const deleteRecipe = () => {

  }

  useEffect(() => updateRecipesList(), []);

  //test
  const [showRecipeForm, setShowComponentA] = useState(true);

  const setShowRecipeForm = () => setShowComponentA(true);
  const processRecipeFormClose = () => setShowComponentA(false);


  return (
    <>
    <div className="rec-list">
      <h2>Recipes list</h2>
      <nav>
        <button onClick={updateRecipesList}>Update</button>
        <button onClick={addRecipe}><span style={{ marginRight: '0.5em' }}>➕</span>Add</button>
        <button onClick={deleteRecipe}><span style={{ marginRight: '0.5em' }}>🗑</span>Delete</button>
      </nav>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Prep. time (min)</th>
            <th>Ingredients</th>
          </tr>
        </thead>
        <tbody>

          {recipes.map((item, i) => (
            <tr key={i} className="list-item">
              <td>
                <input type="checkbox"  className='checkbox'/>
              </td>
              <td>
                {item.name}
              </td>
              <td>
                {item.prepTimeInMinutes}
              </td>
              <td>

              </td>
            </tr>))}
        </tbody>
      </table>
      <RecipeForm />
    </div>

    {showRecipeForm ? (
        <ComponentA switchToB={processRecipeFormClose} />
      ) : (
        <ComponentB switchToA={setShowRecipeForm} />
      )}

    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
