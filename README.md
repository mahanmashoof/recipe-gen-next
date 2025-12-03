# Recipe Generator - Next.js

A unified Next.js application that combines the recipe generator frontend and backend into a single TypeScript project.

## Features

- **AI-Powered Recipe Generation** using OpenAI GPT-4o-mini
- **Customizable Parameters**: ingredients, diet type, portions, and cuisine
- **Password Protection** for API access
- **Modern UI** with Tailwind CSS
- **Responsive Design** for mobile and desktop

## Project Structure

```
recipe-gen-next/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── recipe/
│   │   │       └── route.ts        # API endpoint (replaces Spring Boot backend)
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Main page (replaces React App.tsx)
│   │   └── globals.css             # Global styles
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── PortionsSelector.tsx
│   │   ├── Loading.tsx
│   │   └── RecipeUI.tsx
│   ├── styles/
│   │   └── classNames.ts
│   ├── types.ts
│   └── constants.ts
├── public/
│   └── hamburger.gif               # Loading animation (you need to add this)
├── .env.local                      # Environment variables
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── postcss.config.mjs
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Make sure the `.env.local` file contains your OpenAI API key and password:

```
OPENAI_API_KEY=your_openai_api_key
GET_RECIPE_API_PASSWORD
```

3. Add the `hamburger.gif` loading animation to the `public/` folder (from the original frontend repo)

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Migration Notes

### Backend (Spring Boot → Next.js API Routes)

The Spring Boot backend has been converted to a Next.js API route:

- **Original**: `GenAiController.java`, `RecipeService.java`, `AuthService.java`
- **New**: `src/app/api/recipe/route.ts`

Key changes:

- Uses OpenAI Node.js SDK instead of Spring AI
- Password authentication handled via request headers
- No CORS configuration needed (Next.js handles same-origin requests)

### Frontend (React + Vite → Next.js)

The React frontend has been migrated to Next.js App Router:

- **Original**: React components with Vite
- **New**: Next.js client components with 'use client' directive

Key changes:

- All components marked as 'use client' for client-side interactivity
- API calls now go to `/api/recipe` (local endpoint)
- No need for axios - using native `fetch` API
- Removed the external API URL (now calls local API)

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key
- `GET_RECIPE_API_PASSWORD`: Password required to generate recipes (default: 1979)

## API Usage

**Endpoint**: `GET /api/recipe`

**Headers**:

- `password`: Required for authentication

**Query Parameters**:

- `ingredients`: Comma-separated list of ingredients
- `dietType`: Diet type (balanced, high_fiber, protein_rich, vegan, vegetarian)
- `portions`: Number of portions
- `cuisine`: Cuisine type
- `maxTokens`: (Optional) Max tokens for OpenAI response (default: 1000)

**Response**:

````json
{
  "recipe": "```json\n{\"title\": \"...\", \"ingredients\": [...], \"steps\": [...]}```"
}
````

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **OpenAI API** - GPT-4o-mini for recipe generation

## License

MIT
