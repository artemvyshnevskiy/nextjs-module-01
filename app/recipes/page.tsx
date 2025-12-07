import RecipeList from "../components/recipes/RecipeList"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Популярные блюда",
  description: "Популярные блюда. Список рецептов. Обзоры и подробные инструкции.",
}

export const dynamic = "force-dynamic"

async function fetchRecipes() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`)

  if (!response.ok) {
    throw new Error("Не удалось получить список рецептов")
  }

  return await response.json()
}

export default async function RecipesPage() {
  const recipes = await fetchRecipes()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Рецепты</h1>
      <RecipeList recipes={recipes} />
      <div className="text-center mt-6">
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-400"
        >
          На главную
        </Link>
      </div>
    </div>
  )
}
