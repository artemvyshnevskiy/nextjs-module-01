import { Ingredient, Chef, Recipe } from "@/app/generated/prisma"

type RecipeTagItem = {
  recipeId: number
  tagId: number
  tag: {
    id: number
    name: string
  }
}

declare global {
  type RecipeWithRelations = Recipe & {
    chef?: Chef
    tags?: RecipeTagItem[]
    ingredients?: Ingredient[]
  }
}
