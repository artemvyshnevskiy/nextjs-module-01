import Link from "next/link"
import type { Metadata } from "next"
import RecipeList from "./components/recipes/RecipeList"

export const metadata: Metadata = {
  title: "Блог о вкусной и здоровой пище",
  description: "Рецепты популярных блюд. Инструкции и советы.",
}

export const dynamic = "force-dynamic"

async function fetchMainRecipe() {
  const mainRecipeId = process.env.NEXT_PUBLIC_MAIN_RECIPE_ID

  if (!mainRecipeId) {
    return null
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${mainRecipeId}`)

  if (!response.ok) {
    return null
  }

  return await response.json()
}

export default async function Home() {
  const mainRecipe = await fetchMainRecipe()

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div>
          <h1 className="text-3xl font-bold text-center mb-6">Блог о вкусной и здоровой пище</h1>

          {mainRecipe ? (
            <>
              <h2 className="text-xl font-semibold">Рецепт месяца</h2>
              <RecipeList recipes={[mainRecipe]} />
            </>
          ) : (
            ""
          )}

          <div className="text-center mt-6">
            <Link
              href="/recipes"
              className="text-blue-500 hover:text-blue-400"
            >
              Все рецепты
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
