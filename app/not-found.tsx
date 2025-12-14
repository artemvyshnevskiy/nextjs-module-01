import PageNotFound from "./components/shared/PageNotFound"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "404. Страница не найдена",
  description: "Такой страницы не существует. Возможно она удалена или перемещена.",
}

export default function NotFound() {
  return <PageNotFound />
}
