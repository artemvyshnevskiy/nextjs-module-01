import { ReactNode } from "react"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

export default function RecipeLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="max-w-6xl mx-auto">
      <Link
        href="/recipes"
        className="inline-flex gap-2 items-center text-blue-500 hover:text-blue-400"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span>Ко всем рецептам</span>
      </Link>
      <div>{children}</div>
    </div>
  )
}
