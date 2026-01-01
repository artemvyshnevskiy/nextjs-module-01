import { NextResponse } from "next/server"
import { prisma } from "@/app/libs/prisma"
import { buildRecipeInclude } from "@/app/libs/api/recipes/include"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const recipeId = parseInt(id, 10)

  if (isNaN(recipeId)) {
    return NextResponse.json({ error: "Невалидный id" }, { status: 400 })
  }

  const { searchParams } = new URL(request.url)
  const include = buildRecipeInclude(searchParams)

  try {
    const recipe = await prisma.recipe.findFirst({
      where: { id: recipeId },
      include: include,
    })

    if (!recipe) {
      return NextResponse.json({ error: "Рецепт не найден" }, { status: 404 })
    }

    return NextResponse.json(recipe)
  } catch (error) {
    return NextResponse.json({ error: "Не удалось получить рецепт", details: error }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const recipeId = parseInt(id, 10)

  if (isNaN(recipeId)) {
    return NextResponse.json({ error: "Невалидный id" }, { status: 400 })
  }

  const { title, description, imageUrl } = await request.json()

  try {
    const updatedRecipe = await prisma.recipe.update({
      where: { id: recipeId },
      data: { title, description, imageUrl },
    })

    return NextResponse.json(updatedRecipe, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Не удалось обновить рецепт", details: error }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const recipeId = parseInt(id, 10)

  if (isNaN(recipeId)) {
    return NextResponse.json({ error: "Невалидный id" }, { status: 400 })
  }

  try {
    const deletedRecipe = await prisma.recipe.delete({
      where: { id: recipeId },
    })

    return NextResponse.json(deletedRecipe, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Не удалось удалить рецепт", details: error }, { status: 500 })
  }
}
