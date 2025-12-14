import { prisma } from "@/app/libs/prisma"
import { NextResponse } from "next/server"
import { buildRecipeInclude } from "@/app/libs/api/recipes/include"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const include = buildRecipeInclude(searchParams)

  try {
    const recipes = await prisma.recipe.findMany({
      include: include,
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(recipes)
  } catch (error) {
    return NextResponse.json({ error: "Не удалось получить рецепты", details: error }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const { title, description, imageUrl, chefId, ingredients } = await request.json()

  try {
    const newRecipe = await prisma.recipe.create({
      data: {
        title,
        description,
        imageUrl,
        chefId,
        ingredients: {
          create: ingredients,
        },
      },
    })

    return NextResponse.json(newRecipe, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Не удалось создать новый рецепт", details: error }, { status: 500 })
  }
}
