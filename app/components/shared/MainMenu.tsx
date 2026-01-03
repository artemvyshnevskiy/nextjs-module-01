"use client"

import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react"
import Link from "next/link"
import Image from "next/image"
import Logo from "@/app/icon.png"
import { usePathname } from "next/navigation"

export default function MainMenu() {
  const pathname = usePathname()

  return (
    <Navbar
      fluid
      rounded
    >
      <NavbarBrand
        href="/"
        as={Link}
      >
        <Image
          src={Logo}
          className="me-2 sm:me-3 h-6 w-6 sm:h-9 sm:w-9"
          alt="Logo"
        />
        <span className="self-center whitespace-nowrap sm:text-xl font-semibold dark:text-white">Книга рецептов</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Button>Get started</Button>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink
          as={Link}
          href="/"
          active={pathname === "/"}
        >
          Главная
        </NavbarLink>
        <NavbarLink
          as={Link}
          href="/recipes"
          active={pathname.startsWith("/recipes")}
        >
          Рецепты
        </NavbarLink>
        <NavbarLink
          as={Link}
          href="/about"
          active={pathname === "/about"}
        >
          О нас
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  )
}
