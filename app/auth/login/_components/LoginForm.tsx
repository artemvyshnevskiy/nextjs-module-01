"use client"

import Link from "next/link"
import { ChangeEvent, FormEvent, useState } from "react"
import { TextInput, Label, Checkbox, Button, HelperText } from "flowbite-react"
import { loginFormSchema, loginFormSchemaType } from "../_model/schema"

export default function LoginForm() {
  const [formData, setFormData] = useState<loginFormSchemaType>({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState<Partial<Record<keyof loginFormSchemaType, string | undefined>>>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [id]: undefined,
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const result = loginFormSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof loginFormSchemaType, string | undefined>> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof loginFormSchemaType
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message
        }
      }

      setErrors(fieldErrors)
      return
    }

    console.log(formData)
  }

  return (
    <form
      className="flex flex-col gap-4 md:gap-6"
      action="#"
      onSubmit={handleSubmit}
    >
      <div>
        <div className="mb-2">
          <Label htmlFor="email">Email</Label>
        </div>
        <TextInput
          type="email"
          name="email"
          id="email"
          placeholder="name@company.com"
          required
          value={formData.email}
          onChange={handleChange}
          color={errors.email ? "failure" : undefined}
        />
        {errors.email && <HelperText color="failure">{errors.email}</HelperText>}
      </div>

      <div>
        <div className="mb-2">
          <Label htmlFor="password">Пароль</Label>
        </div>
        <TextInput
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          required
          value={formData.password}
          onChange={handleChange}
          color={errors.password ? "failure" : undefined}
        />
        {errors.password && <HelperText color="failure">{errors.password}</HelperText>}
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Запомнить меня</Label>
      </div>

      <Button
        type="submit"
        className="cursor-pointer"
      >
        Войти
      </Button>

      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Ещё нет аккаунта?{" "}
        <Link
          href="/auth/registration"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Зарегистрироваться
        </Link>
      </p>
    </form>
  )
}
