import React, { useState, useEffect } from 'react';

import "../index.css";
import { Recipe } from '../../metadata/recipes';

export const RecipeList = ({ setShowRecipeForm, buttonClicked, updateRecipes, recipes }) => {



    const addRecipe = () => {
        setShowRecipeForm(true);
    }

    const deleteRecipe = () => {

    }


    return (
        <div className="rec-list">
            <h2>Recipes list</h2>
            <nav>
                <button onClick={updateRecipes}>Update</button>
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
                                <input type="checkbox" className='checkbox' />
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

        </div>
    );
}
