import { ingredients } from "../route"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const recipeId = parseInt(id, 10)

  if (isNaN(recipeId)) {
    return NextResponse.json({ error: "Невалидный id" }, { status: 400 })
  }

  const recipeExists = ingredients.some((item) => item.recipeId === recipeId)
  if (!recipeExists) {
    return NextResponse.json({ error: `Ингредиенты для рецепта ${id} не найдены` }, { status: 404 })
  }

  const recipeIngredients = ingredients.filter((item) => item.recipeId === recipeId)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return NextResponse.json(recipeIngredients.map(({ recipeId, ...rest }) => rest))
}
