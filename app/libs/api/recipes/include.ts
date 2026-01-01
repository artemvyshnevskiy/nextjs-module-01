import { parseExpand } from "@/app/libs/api/expand"
import { Prisma } from "@/app/generated/prisma"

const RECIPE_EXPANDS = ["ingredients", "tags", "chef"]

export function buildRecipeInclude(searchParams: URLSearchParams): Prisma.RecipeInclude | undefined {
  const expand = parseExpand(searchParams, RECIPE_EXPANDS)
  if (expand.length === 0) return undefined

  return {
    ingredients: expand.includes("ingredients"),
    chef: expand.includes("chef"),
    tags: expand.includes("tags") ? { include: { tag: true } } : false,
  }
}
