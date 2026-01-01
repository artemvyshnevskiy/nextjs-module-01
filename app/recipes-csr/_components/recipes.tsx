"use client"

import RecipeList from "@/app/components/recipes/RecipeList"
import { ArrowPathIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { Recipe } from "@/app/generated/prisma"

export default function Recipes() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetchRecipes = async () => {
      try {
        setIsLoading(true)

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`, { signal })

        if (!res.ok) {
          throw new Error("Не удалось загрузить рецепты")
        }

        const recipes = await res.json()
        setRecipes(recipes)
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") {
          console.log("Запрос отменен")
        } else if (error instanceof Error) {
          setError(error.message)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecipes()

    return () => {
      controller.abort()
    }
  }, [])

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="inline-flex gap-2 items-center">
          <span>Загрузка</span> <ArrowPathIcon className="animate-spin w-4 h-4" />
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return <RecipeList recipes={recipes} />
}
