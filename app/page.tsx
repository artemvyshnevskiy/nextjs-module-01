import type { Metadata } from "next"
import HeroSection from "./components/shared/HeroSection"
import { schema } from "./libs/env/check"
import { prisma } from "./libs/prisma"

export const metadata: Metadata = {
  title: "Блог о вкусной и здоровой пище",
  description: "Рецепты популярных блюд. Инструкции и советы.",
}

export default async function Home() {
  const featuredRecipeIds = schema.parse(process.env).NEXT_PUBLIC_FEATURED_RECIPE_IDS ?? []
  const featuredRecipes = await prisma.recipe.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      imageUrl: true,
    },
    where: { id: { in: featuredRecipeIds } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <>
      <HeroSection
        headline="Блог о вкусной и здоровой пище"
        subline="Откройте для себя коллекцию проверенных блюд от лучших поваров."
        primaryButtonText="Все рецепты"
        primaryButtonLink="/recipes"
        secondaryButtonText="Как это работает"
        secondaryButtonLink="/about"
        alertBadge="Хит"
        alertText="Новые рецепты каждую неделю!"
        alertLink="/recipes"
        featuredText="Популярные рецепты"
        featuredRecipes={featuredRecipes}
      />
    </>
  )
}
