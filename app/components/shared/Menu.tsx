"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Menu() {
  const pathName = usePathname()

  return (
    <nav className="flex gap-4">
      <Link
        //className="text-white hover:text-neutral-200 p-2 text-sm"
        className={`text-white p-2 text-sm ${pathName === "/" ? "border-b border-b-white -mb-px" : "hover:text-neutral-200"}`}
        href="/"
      >
        Главная
      </Link>
      <Link
        className={`text-white p-2 text-sm ${pathName.startsWith("/recipes") ? "border-b border-b-white -mb-px" : "hover:text-neutral-200"}`}
        href="/recipes"
      >
        Рецепты
      </Link>
      <Link
        className={`text-white p-2 text-sm ${pathName === "/about" ? "border-b border-b-white -mb-px" : "hover:text-neutral-200"}`}
        href="/about"
      >
        О нас
      </Link>
    </nav>
  )
}
