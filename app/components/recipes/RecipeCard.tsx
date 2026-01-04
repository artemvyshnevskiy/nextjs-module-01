"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { Ingredient } from "@/app/generated/prisma"
import Rating from "./Rating"
import { Card } from "flowbite-react"

export default function RecipeCard({ id, title, description, imageUrl, rating, chef, tags }: RecipeWithRelations) {
  const [liked, setLiked] = useState(false)
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(true)
  const [ingredientsShown, setIngredientsShown] = useState(false)
  const [ingredientsFetched, setIngredientsFetched] = useState(false)

  const likeStorageId = `recipe-liked-${id}`

  useEffect(() => {
    const likeSaved = localStorage.getItem(likeStorageId)

    if (likeSaved) {
      queueMicrotask(() => {
        setLiked(true)
      })
    }
  }, [likeStorageId])

  async function fetchIngredients() {
    setIsLoadingIngredients(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}/ingredients`)

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
    if (!ingredientsFetched) {
      fetchIngredients()
      setIngredientsFetched(true)
    }
  }

  function hideIngredients() {
    setIngredientsShown(false)
  }

  const toggleLike = () => {
    const newLiked = !liked
    setLiked(newLiked)

    if (newLiked) {
      localStorage.setItem(likeStorageId, "1")
    } else {
      localStorage.removeItem(likeStorageId)
    }
  }

  return (
    <Card
      className="w-full overflow-hidden relative"
      renderImage={() => (
        <Link href={`/recipes/${id}`}>
          <Image
            width={640}
            height={427}
            src={imageUrl}
            alt={title}
          />
        </Link>
      )}
    >
      <button
        onClick={toggleLike}
        className="absolute top-2 end-2 p-2 cursor-pointer"
      >
        {liked ? (
          <SolidHeartIcon
            width="24"
            height="24"
            className="text-red-500"
          />
        ) : (
          <SolidHeartIcon
            width="24"
            height="24"
            className="text-white"
          />
        )}
      </button>
      <div className="flex h-full flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <Link href={`/recipes/${id}`}>{title}</Link>
        </h2>

        <Rating value={rating} />

        <p className="font-normal text-gray-700 dark:text-gray-400">{description}</p>

        {!ingredientsShown ? (
          <button
            className="text-blue-500 hover:text-blue-400 text-sm cursor-pointer text-start"
            onClick={showIngredients}
          >
            Показать ингредиенты
          </button>
        ) : (
          <>
            <ul className="text-sm text-gray-500 flex flex-col gap-1">
              {isLoadingIngredients
                ? Array(4)
                    .fill(null)
                    .map((item, i) => (
                      <li key={i}>
                        <span className="bg-gray-100 dark:bg-gray-700 block w-full h-5 rounded-sm animate-pulse"></span>
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
              className="text-blue-500 hover:text-blue-400 text-sm cursor-pointer text-start"
              onClick={hideIngredients}
            >
              Скрыть ингредиенты
            </button>
          </>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {chef && <div className="text-sm text-gray-600 dark:text-gray-500">{chef.name}</div>}
        {tags && tags.length > 0 && (
          <ul className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <li
                key={tag.tagId}
                className="px-2 py-1 text-sm rounded bg-gray-100 dark:bg-gray-700"
              >
                #{tag.tag.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  )
}
