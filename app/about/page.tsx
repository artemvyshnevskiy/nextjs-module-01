import { Metadata } from "next"

export const metadata: Metadata = {
  title: "О нас",
  description: "Рассказываем о нашем проете",
}

export default function AboutPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4 sm:mb-8 sm:text-center">О нас</h1>
      <p className="text-lg text-center">
        Добро пожаловать на сайт Книга рецептов! Подпишись на нас в соцсетях и узнавай новые рецепты каждую неделю.
      </p>
    </>
  )
}
