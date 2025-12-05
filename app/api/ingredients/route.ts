import { NextResponse } from "next/server"

export const ingredients = [
  { id: 1, recipeId: 1, name: "Спагетти", amount: "200 г" },
  { id: 2, recipeId: 1, name: "Яйца", amount: "2 шт" },
  { id: 3, recipeId: 1, name: "Пармезан", amount: "50 г" },
  { id: 4, recipeId: 1, name: "Бекон", amount: "100 г" },

  { id: 5, recipeId: 2, name: "Тесто", amount: "1 шт" },
  { id: 6, recipeId: 2, name: "Томаты", amount: "2 шт" },
  { id: 7, recipeId: 2, name: "Моцарелла", amount: "100 г" },
  { id: 8, recipeId: 2, name: "Базилик", amount: "по вкусу" },

  { id: 9, recipeId: 3, name: "Салат романо", amount: "150 г" },
  { id: 10, recipeId: 3, name: "Гренки", amount: "50 г" },
  { id: 11, recipeId: 3, name: "Курица (опционально)", amount: "100 г" },
  { id: 12, recipeId: 3, name: "Соус Цезарь", amount: "по вкусу" },
]

export async function GET() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return NextResponse.json(ingredients.map(({ recipeId, ...rest }) => rest))
}
