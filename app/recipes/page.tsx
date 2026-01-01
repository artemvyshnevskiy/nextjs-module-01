import RecipeList from "../components/recipes/RecipeList"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Популярные блюда",
  description: "Популярные блюда. Список рецептов. Обзоры и подробные инструкции.",
}

export const dynamic = "force-dynamic"

async function fetchRecipes() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes?expand=tags,chef`)

  if (!response.ok) {
    throw new Error("Не удалось получить список рецептов")
  }

  return await response.json()
}

export default async function RecipesPage() {
  const recipes = await fetchRecipes()

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center">Рецепты</h1>
      <RecipeList recipes={recipes} />
    </>
  )
}
