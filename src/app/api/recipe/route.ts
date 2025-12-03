import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(request: NextRequest) {
  try {
    // Get password from headers
    const password = request.headers.get("password");
    const expectedPassword = process.env.GET_RECIPE_API_PASSWORD;

    // Validate password
    if (password !== expectedPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const ingredients = searchParams.get("ingredients");
    const dietType = searchParams.get("dietType");
    const portions = searchParams.get("portions");
    const cuisine = searchParams.get("cuisine");
    const maxTokens = parseInt(searchParams.get("maxTokens") || "1000");

    // Validate required parameters
    if (!ingredients || !dietType || !portions || !cuisine) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Create the prompt (same as Spring Boot RecipeService)
    const promptText = `I need a recipe with the following requirements:
Ingredients: ${ingredients}
Diet type: ${dietType}
Portions: ${portions}
Cuisine: ${cuisine}

The recipe should match the ingredients, but doesn't necessarily need to consist only of them. You are free to add more stuff if it results in a better recipe that matches the desired Diet type.
Try to find the recipe online first. If difficult, you can create one.
Please provide a recipe with simple and straightforward cooking instructions in json format as follows: title, ingredients: {title, quantity, unitOfMeasurement}, steps without numbers.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: promptText }],
      temperature: 0.7,
      max_tokens: maxTokens,
    });

    const recipeText = completion.choices[0]?.message?.content || "";

    // Return the recipe text
    return NextResponse.json(
      { recipe: recipeText },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error generating recipe:", error);
    return NextResponse.json(
      { error: "Failed to generate recipe" },
      { status: 500 }
    );
  }
}
