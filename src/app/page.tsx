"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import PortionsSelector from "@/components/PortionsSelector";
import Loading from "@/components/Loading";
import RecipeUI from "@/components/RecipeUI";
import { navbarHeight } from "@/constants";
import type { FilteredRecipeData } from "@/types";

export default function Home() {
  const initialPortions = 4;
  const [ingredients, setIngredients] = useState("");
  const [diet, setDiet] = useState("");
  const [portions, setPortions] = useState(initialPortions);
  const [cuisine, setCuisine] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState<FilteredRecipeData>({
    title: "",
    ingredients: [],
    steps: [],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const params = new URLSearchParams({
        ingredients,
        dietType: diet,
        portions: portions.toString(),
        cuisine,
      });

      const response = await fetch(`/api/recipe?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          password: password,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert("Incorrect password");
        } else {
          alert("Failed to generate recipe");
        }
        setLoading(false);
        return;
      }

      const data = await response.json();
      const recipeText = data.recipe;

      // Parse the JSON from the markdown code block
      const jsonString = recipeText.match(/```json\n([\s\S]*?)\n```/)?.[1];
      if (jsonString) {
        const parsedRecipe = JSON.parse(jsonString);
        setFilteredData({
          title: parsedRecipe.title || "",
          ingredients: parsedRecipe.ingredients || [],
          steps: parsedRecipe.steps || [],
        });
      }
    } catch (err) {
      console.error("Error fetching recipe:", err);
      alert("An error occurred while generating the recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-yellow-500 min-h-screen overflow-hidden">
      <Navbar pHeight={navbarHeight} />
      <div
        className="p-4 md:p-8 flex md:flex-row flex-col gap-4 md:gap-8"
        style={{ minHeight: `calc(100vh - ${navbarHeight * 16}px)` }}
      >
        <form
          className="w-full md:w-1/3 bg-white/80 rounded-xl shadow-lg flex flex-col gap-4 md:gap-6 p-4 md:p-6 justify-start border border-yellow-300"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl md:text-2xl font-bold text-yellow-700 mb-2">
            Recipe Generator
          </h2>
          <label className="flex flex-col gap-2 font-medium text-yellow-800 text-sm md:text-base">
            Ingredients
            <textarea
              placeholder="List ingredients here, separated by comma"
              className="p-2 md:p-3 w-full h-20 md:h-24 rounded border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition text-sm md:text-base"
              required
              onChange={(e) => setIngredients(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2 font-medium text-yellow-800 text-sm md:text-base">
            Select Diet
            <select
              className="p-2 md:p-3 rounded border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition text-sm md:text-base"
              required
              onChange={(e) => setDiet(e.currentTarget.value)}
            >
              <option value="">Select Diet</option>
              <option value="balanced">Balanced</option>
              <option value="high_fiber">High fiber</option>
              <option value="protein_rich">Protein rich</option>
              <option value="vegan">Vegan</option>
              <option value="vegetarian">Vegetarian</option>
            </select>
          </label>
          <label className="flex flex-col gap-2 font-medium text-yellow-800 text-sm md:text-base">
            Portions
            <PortionsSelector portions={portions} setPortions={setPortions} />
          </label>
          <label className="flex flex-col gap-2 font-medium text-yellow-800 text-sm md:text-base">
            Cuisine
            <input
              className="p-2 md:p-3 rounded border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition text-sm md:text-base"
              placeholder="e.g. Italian, Thai, Persian"
              type="text"
              required
              onChange={(e) => setCuisine(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2 font-medium text-yellow-800 text-sm md:text-base">
            Password
            <input
              className="p-2 md:p-3 rounded border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition text-sm md:text-base"
              placeholder="enter correct password to generate recipe"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="mt-2 p-2 md:p-3 bg-yellow-500 text-yellow-900 font-semibold rounded-lg shadow hover:bg-yellow-600 transition text-sm md:text-base"
          >
            🍳 Generate Recipe
          </button>
        </form>
        <section className="w-full md:w-2/3 bg-white/70 rounded-xl shadow-lg p-4 md:p-6 flex flex-col">
          <h2 className="text-lg md:text-xl font-semibold text-yellow-700 mb-4">
            Generated Recipe
          </h2>
          <div className="p-2 md:p-3 w-full h-[50vh] md:h-[70vh] rounded border border-yellow-200 bg-yellow-50 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 transition overflow-y-scroll">
            {loading ? <Loading /> : <RecipeUI {...filteredData} />}
          </div>
        </section>
      </div>
    </div>
  );
}
