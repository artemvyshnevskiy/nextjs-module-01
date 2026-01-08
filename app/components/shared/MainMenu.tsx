"use client"

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  DarkThemeToggle,
  Dropdown,
  Avatar,
  DropdownHeader,
  DropdownItem,
  DropdownDivider,
} from "flowbite-react"
import Link from "next/link"
import Image from "next/image"
import Logo from "@/app/icon.png"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"

export default function MainMenu() {
  const pathname = usePathname()
  const { data: session } = useSession()

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
        {session && (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                placeholderInitials={session.user?.name?.substring(0, 1)}
                className="cursor-pointer"
                rounded
              />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">{session.user?.name}</span>
              <span className="block truncate text-sm font-medium">{session.user?.email}</span>
            </DropdownHeader>
            <DropdownDivider />
            <DropdownItem onClick={() => signOut()}>Выйти</DropdownItem>
          </Dropdown>
        )}

        {!session && !pathname.startsWith("/auth") && (
          <Button
            href="/auth/login"
            as={Link}
          >
            Войти
          </Button>
        )}

        <DarkThemeToggle className="ms-2" />
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
