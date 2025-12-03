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
    <div className="bg-gradient-to-br from-stone-100 via-stone-50 to-amber-50 min-h-screen overflow-hidden">
      <Navbar pHeight={navbarHeight} />
      <div
        className="p-4 md:p-8 flex md:flex-row flex-col gap-4 md:gap-8"
        style={{ minHeight: `calc(100vh - ${navbarHeight * 16}px)` }}
      >
        <form
          className="w-full md:w-1/3 bg-white rounded-lg shadow-xl flex flex-col gap-4 md:gap-5 p-5 md:p-7 justify-start border border-stone-200"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl md:text-2xl font-serif font-light text-slate-800 mb-2 pb-3 border-b border-amber-600/30">
            Create Your Recipe
          </h2>
          <label className="flex flex-col gap-2 font-medium text-slate-700 text-sm md:text-base">
            Ingredients
            <textarea
              placeholder="e.g., chicken breast, tomatoes, basil..."
              className="p-3 md:p-4 w-full h-20 md:h-24 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition text-sm md:text-base bg-stone-50"
              required
              onChange={(e) => setIngredients(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2 font-medium text-slate-700 text-sm md:text-base">
            Dietary Preference
            <select
              className="p-3 md:p-4 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition text-sm md:text-base bg-stone-50"
              required
              onChange={(e) => setDiet(e.currentTarget.value)}
            >
              <option value="">Choose your preference</option>
              <option value="balanced">Balanced</option>
              <option value="high_fiber">High Fiber</option>
              <option value="protein_rich">High Protein</option>
              <option value="vegan">Vegan</option>
              <option value="vegetarian">Vegetarian</option>
            </select>
          </label>
          <label className="flex flex-col gap-2 font-medium text-slate-700 text-sm md:text-base">
            Servings
            <PortionsSelector portions={portions} setPortions={setPortions} />
          </label>
          <label className="flex flex-col gap-2 font-medium text-slate-700 text-sm md:text-base">
            Cuisine Style
            <input
              className="p-3 md:p-4 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition text-sm md:text-base bg-stone-50"
              placeholder="e.g., Italian, Japanese, Mediterranean"
              type="text"
              required
              onChange={(e) => setCuisine(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2 font-medium text-slate-700 text-sm md:text-base">
            Access Code
            <input
              className="p-3 md:p-4 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition text-sm md:text-base bg-stone-50"
              placeholder="Enter password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="mt-3 p-3 md:p-4 bg-gradient-to-r from-amber-700 to-amber-600 text-amber-50 font-medium rounded-md shadow-lg hover:from-amber-600 hover:to-amber-500 transition-all duration-200 text-sm md:text-base tracking-wide"
          >
            Generate Recipe
          </button>
        </form>
        <section className="w-full md:w-2/3 bg-white rounded-lg shadow-xl p-5 md:p-8 flex flex-col border border-stone-200">
          <h2 className="text-xl md:text-2xl font-serif font-light text-slate-800 mb-5 pb-3 border-b border-amber-600/30">
            Your Recipe
          </h2>
          <div className="p-4 md:p-6 w-full h-[50vh] md:h-[70vh] rounded-md border border-stone-200 bg-stone-50/50 overflow-y-auto">
            {loading ? <Loading /> : <RecipeUI {...filteredData} />}
          </div>
        </section>
      </div>
    </div>
  );
}
