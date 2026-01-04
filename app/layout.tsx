import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import MainMenu from "./components/shared/MainMenu"
import { ThemeModeScript } from "flowbite-react"

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
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <ThemeModeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <header className="shadow-lg">
          <MainMenu />
        </header>
        <main className="grow">
          <div className="container mx-auto p-4">{children}</div>
        </main>
        <footer className="p-4 text-center text-sm bg-neutral-700 text-neutral-100 dark:bg-gray-800 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Книга рецептов. Все права защищены
        </footer>
      </body>
    </html>
  )
}
