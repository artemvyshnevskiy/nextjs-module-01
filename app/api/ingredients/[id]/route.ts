import { NextResponse } from "next/server"
import { prisma } from "@/app/libs/prisma"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ingredientId = parseInt(id, 10)

  if (isNaN(ingredientId)) {
    return NextResponse.json({ error: "Невалидный id" }, { status: 400 })
  }

  try {
    const ingredient = await prisma.ingredient.findFirst({ where: { id: ingredientId } })

    if (!ingredient) {
      return NextResponse.json({ error: `Ингредиент не найден` }, { status: 404 })
    }

    return NextResponse.json(ingredient)
  } catch (error) {
    return NextResponse.json({ error: "Не удалось получить ингредиент", details: error }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ingredientId = parseInt(id, 10)

  if (isNaN(ingredientId)) {
    return NextResponse.json({ error: "Невалидный id" }, { status: 400 })
  }

  const { name, amount } = await request.json()

  try {
    const updatedIngredient = await prisma.ingredient.update({
      where: { id: ingredientId },
      data: { name, amount },
    })

    return NextResponse.json(updatedIngredient, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Не удалось обновить ингредиент", details: error }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ingredientId = parseInt(id, 10)

  if (isNaN(ingredientId)) {
    return NextResponse.json({ error: "Невалидный id" }, { status: 400 })
  }

  try {
    const deletedIngredient = await prisma.ingredient.delete({
      where: { id: ingredientId },
    })

    return NextResponse.json(deletedIngredient, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Не удалось удалить ингредиент", details: error }, { status: 500 })
  }
}
