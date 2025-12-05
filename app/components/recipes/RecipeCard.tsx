"use client"

import Image from "next/image"
import { useState } from "react"
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

export interface RecipeCardProps {
  id: number
  title: string
  description: string
  image: string
}

interface Ingredient {
  id: number
  name: string
  amount: string
}

export default function RecipeCard({ id, title, description, image }: RecipeCardProps) {
  const [liked, setLiked] = useState(false)
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(true)
  const [ingredientsShown, setIngredientsShown] = useState(false)

  async function fetchIngredients() {
    setIsLoadingIngredients(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredients/${id}`)

      if (!response.ok) {
        throw new Error("Не удалось загрузить ингредиенты")
      }

      const result = await response.json()
      setIngredients(result)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoadingIngredients(false)
    }
  }

  function showIngredients() {
    setIngredientsShown(true)
    if (ingredients.length === 0) {
      fetchIngredients()
    }
  }

  function hideIngredients() {
    setIngredientsShown(false)
  }

  return (
    <li
      className="rounded-lg overflow-hidden shadow flex flex-col"
      key={id}
    >
      <Link href={`/recipes/${id}`}>
        <Image
          src={image}
          alt={title}
          width="640"
          height="427"
        />
      </Link>
      <div className="p-4 flex flex-col justify-between gap-4 grow">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            <Link href={`/recipes/${id}`}>{title}</Link>
          </h2>
          <p className="text-sm text-gray-700">{description}</p>
          {!ingredientsShown ? (
            <button
              className="text-blue-500 hover:text-blue-400 text-sm cursor-pointer"
              onClick={showIngredients}
            >
              Показать ингредиенты
            </button>
          ) : (
            <>
              <ul className="text-sm text-gray-500 mt-4 flex flex-col gap-1">
                {isLoadingIngredients
                  ? Array(4)
                      .fill(null)
                      .map((item, i) => (
                        <li key={i}>
                          <span className="bg-gray-300 block w-full h-5 rounded-sm animate-pulse"></span>
                        </li>
                      ))
                  : ingredients.map((ingredient) => (
                      <li
                        key={ingredient.id}
                        className="flex justify-between"
                      >
                        <span>{ingredient.name}</span> <span>{ingredient.amount}</span>
                      </li>
                    ))}
              </ul>
              <button
                className="text-blue-500 hover:text-blue-400 text-sm cursor-pointer"
                onClick={hideIngredients}
              >
                Скрыть ингредиенты
              </button>
            </>
          )}
        </div>
        <button
          onClick={() => setLiked(!liked)}
          className="flex items-center gap-1 text-sm cursor-pointer"
        >
          {liked ? (
            <>
              <SolidHeartIcon
                width="24"
                height="24"
                className="text-red-500"
              />
              <span>Вы поставили лайк!</span>
            </>
          ) : (
            <>
              <OutlineHeartIcon
                width="24"
                height="24"
                className="text-gray-500"
              />
              <span>Поставить лайк</span>
            </>
          )}
        </button>
      </div>
    </li>
  )
}
