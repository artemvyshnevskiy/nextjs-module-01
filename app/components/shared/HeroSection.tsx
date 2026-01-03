import { ArrowRightIcon, ChevronRightIcon, PlayIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import type { Prisma } from "@/app/generated/prisma"
import Image from "next/image"

type Recipe = Prisma.RecipeGetPayload<{
  select: {
    id: true
    title: true
    description: true
    imageUrl: true
  }
}>

type HeroSectionProps = {
  headline: string
  subline: string

  primaryButtonText: string
  primaryButtonLink: string

  secondaryButtonText: string
  secondaryButtonLink: string

  alertBadge: string
  alertText: string
  alertLink: string

  featuredText: string
  featuredRecipes: Recipe[]
}

export default function HeroSection({
  headline,
  subline,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  alertBadge,
  alertText,
  alertLink,
  featuredText,
  featuredRecipes,
}: HeroSectionProps) {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-7xl lg:py-16 lg:px-12">
        <div className="text-center">
          <Link
            href={alertLink}
            className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            role="alert"
          >
            <span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 mr-3">{alertBadge}</span>
            <span className="text-sm font-medium">{alertText}</span>
            <ChevronRightIcon className="ml-2 w-5 h-5" />
          </Link>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            {headline}
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">{subline}</p>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Link
              href={primaryButtonLink}
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              {primaryButtonText}
              <ArrowRightIcon className="ml-2 -mr-1 w-5 h-5" />
            </Link>
            <Link
              href={secondaryButtonLink}
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <PlayIcon className="mr-2 -ml-1 w-5 h-5" />
              {secondaryButtonText}
            </Link>
          </div>
        </div>

        {featuredRecipes.length ? (
          <div>
            <h2 className="font-semibold text-gray-400 uppercase pb-4 text-center">{featuredText}</h2>
            <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {featuredRecipes.map((recipe) => (
                <li
                  key={recipe.id}
                  className="rounded-lg overflow-hidden shadow border border-gray-100 bg-white"
                >
                  <Link href={`/recipes/${recipe.id}`}>
                    <Image
                      width="640"
                      height="427"
                      src={recipe.imageUrl}
                      alt={recipe.title}
                    />
                  </Link>
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold">
                        <Link href={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                      </h3>
                      <p className="text-sm text-gray-700">{recipe.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  )
}
