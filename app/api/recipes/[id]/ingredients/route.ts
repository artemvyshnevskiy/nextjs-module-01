import { NextResponse } from "next/server"
import { prisma } from "@/app/libs/prisma"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const recipeId = parseInt(id, 10)

  if (isNaN(recipeId)) {
    return NextResponse.json({ error: "Невалидный id" }, { status: 400 })
  }

  try {
    const ingredients = await prisma.ingredient.findMany({ where: { recipeId: recipeId } })

    if (!ingredients) {
      return NextResponse.json({ error: `Ингредиенты для рецепта ${id} не найдены` }, { status: 404 })
    }

    return NextResponse.json(ingredients)
  } catch (error) {
    return NextResponse.json({ error: "Не удалось получить ингредиенты", details: error }, { status: 500 })
  }
}
