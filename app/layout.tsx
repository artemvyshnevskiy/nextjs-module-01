import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { FireIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import Menu from "./components/shared/Menu"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Книга рецептов",
  description: "Лучшие рецепты со всего мира",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <header className="bg-linear-to-r from-orange-500 to-red-500">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link
              href="/"
              className="text-xl text-white flex items-center gap-2"
            >
              <FireIcon className="w-5 h-5" />
              Книга рецептов
            </Link>
            <Menu />
          </div>
        </header>
        <main className="grow">
          <div className="container mx-auto p-4">{children}</div>
        </main>
        <footer className="p-4 text-center text-sm bg-neutral-700 text-neutral-100">
          &copy; {new Date().getFullYear()} Книга рецептов. Все права защищены
        </footer>
      </body>
    </html>
  )
}
