"use client";

import type { FilteredRecipeData } from "@/types";

const RecipeUI = (data: FilteredRecipeData) => {
  return (
    <div className="">
      {data.title.length > 0 ? (
        <div>
          <h2 className="text-2xl md:text-3xl font-serif font-light mb-4 md:mb-6 text-slate-800 border-b-2 border-amber-600 pb-3">
            {data.title}
          </h2>
          <h3 className="text-lg md:text-xl font-serif font-medium mb-3 text-slate-700 uppercase tracking-wide">
            Ingredients
          </h3>
          <ul className="space-y-2 mb-6 md:mb-8 ml-4">
            {data.ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="text-sm md:text-base text-slate-700 flex items-start before:content-['•'] before:text-amber-600 before:font-bold before:mr-3"
              >
                <span>
                  <span className="font-medium">
                    {ingredient.quantity} {ingredient.unitOfMeasurement}
                  </span>{" "}
                  {ingredient.title}
                </span>
              </li>
            ))}
          </ul>
          <h3 className="text-lg md:text-xl font-serif font-medium mb-3 text-slate-700 uppercase tracking-wide">
            Preparation
          </h3>
          <ol className="space-y-3">
            {data.steps.map((step, index) => (
              <li
                key={index}
                className="text-sm md:text-base text-slate-700 pl-8 relative before:content-[counter(step)] before:counter-increment-[step] before:absolute before:left-0 before:top-0 before:w-6 before:h-6 before:bg-amber-600 before:text-white before:rounded-full before:flex before:items-center before:justify-center before:text-xs before:font-semibold"
                style={{ counterIncrement: "step" }}
              >
                {step}
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <p className="text-slate-500 text-center italic" />
      )}
    </div>
  );
};

export default RecipeUI;
