import { NextResponse } from "next/server"
import { prisma } from "@/app/libs/prisma"
import z from "zod"

export async function GET() {
  try {
    const ingredients = await prisma.ingredient.findMany()

    return NextResponse.json(ingredients)
  } catch (error) {
    return NextResponse.json({ error: "Не удалось получить ингредиенты", details: error }, { status: 500 })
  }
}

const createIngredientSchema = z.object({
  name: z.string().trim().min(1, "Название ингредиента не может быть пустым"),
  amount: z.string().trim().min(1, "Количество ингредиента не может быть пустым"),
  recipeId: z.coerce.number().int().positive(),
})

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = createIngredientSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: "Не удалось создать ингредиент", details: z.treeifyError(parsed.error) }, { status: 400 })
  }

  const { name, amount, recipeId } = parsed.data

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
