import { ArrowRightIcon } from "@heroicons/react/20/solid"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "О нас",
  description: "Рассказываем о нашем проете",
}

export default function AboutPage() {
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="gap-8 items-center py-8 px-4 mx-auto max-w-7xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
        <Image
          src="/images/pizza.jpg"
          alt="Пицца"
          width={640}
          height={427}
          className="w-full rounded-lg"
        />
        <div className="mt-4 md:mt-0">
          <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-00 dark:text-white">О нас</h1>
          <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
            Добро пожаловать на сайт Книга рецептов! Подпишись на нас в соцсетях и узнавай новые рецепты каждую неделю.
          </p>
          <Link
            href="/recipes"
            className="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900"
          >
            К рецептам
            <ArrowRightIcon className="ml-2 -mr-1 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
