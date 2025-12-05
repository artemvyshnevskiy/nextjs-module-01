import { NextResponse } from "next/server"
import { recipes } from "../route"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const recipeId = parseInt(id, 10)

  if (isNaN(recipeId)) {
    return NextResponse.json({ error: "Невалидный id" }, { status: 400 })
  }

  const recipe = recipes.find((item) => item.id === recipeId)
  if (!recipe) {
    return NextResponse.json({ error: "Рецепт не найден" }, { status: 404 })
  }

  return NextResponse.json(recipe)
}
