import { NextResponse } from "next/server"
import { prisma } from "@/app/libs/prisma"

export async function GET() {
  try {
    const ingredients = await prisma.ingredient.findMany()

    return NextResponse.json(ingredients)
  } catch (error) {
    return NextResponse.json({ error: "Не удалось получить ингредиенты", details: error }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const { name, amount, recipeId } = await request.json()

  try {
    const newIngredient = await prisma.ingredient.create({
      data: {
        name,
        amount,
        recipeId,
      },
    })

    return NextResponse.json(newIngredient, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Не удалось создать ингредиент", details: error }, { status: 500 })
  }
}
