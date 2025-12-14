import type { Metadata } from "next"
import Recipes from "./_components/recipes"

export const metadata: Metadata = {
  title: "Популярные блюда",
  description: "Популярные блюда. Список рецептов. Обзоры и подробные инструкции.",
}

export default async function RecipesPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Рецепты</h1>
      <Recipes />
    </div>
  )
}
