import { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Recipe } from "@/app/generated/prisma"

export const dynamic = "force-dynamic"

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string[] | string | undefined }>
}

type RecipePageProps = {
  params: Promise<{ id: string }>
}

async function getRecipeById(id: string): Promise<Recipe | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`)

  if (!res.ok) {
    return null
  }

  const recipe: Recipe = await res.json()

  return recipe
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const id = (await params).id
  const recipe = await getRecipeById(id)

  if (!recipe) {
    notFound()
  }

  return {
    title: recipe.title,
    description: recipe.description,
  }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params
  const recipe = await getRecipeById(id)

  if (!recipe) {
    notFound()
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 sm:mb-8 sm:text-center">{recipe.title}</h1>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2">
          <Image
            src={recipe.imageUrl}
            alt=""
            width="640"
            height="427"
            className="rounded-2xl"
          />
        </div>
        <div className="w-full sm:w-1/2 p-4 sm:p-8">{recipe.description}</div>
      </div>
    </>
  )
}
