import React, { useState } from 'react';

import "../index.css";
import { recipe } from '../../metadata/recipes';

export const RecipeForm = () => {

    const [recipe, setRecipe] = useState<recipe>({ name: 'name recipe', prepTimeInMinutes: 0, ingredients: [] });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe({
            ...recipe,
            [name]: name === 'prepTimeInMinutes' ? Number(value) : value,
        });
        console.log(recipe);

    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/addRecipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipe),
            });
            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={recipe.name} onChange={handleChange} />
            </label>
            <br />
            <label>
                Prep. time:
                <input type="number" name="prepTimeInMinutes" value={recipe.prepTimeInMinutes} onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>

    )
}