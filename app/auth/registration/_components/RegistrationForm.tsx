"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { TextInput, Label, Checkbox, Button, HelperText, Alert } from "flowbite-react"
import { registrationFormSchema, registrationFormSchemaType } from "../_model/schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function RegistrationForm() {
  const [formError, setFormError] = useState<string | null>(null)
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      router.push("/")
    }
  }, [router, session])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registrationFormSchemaType>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      "confirm-password": "",
      terms: false,
    },
  })

  const onSubmit = async (data: registrationFormSchemaType) => {
    setFormError(null)

    const { email, name, password } = data
    console.log(email, name, password)
  }

  return (
    <form
      className="flex flex-col gap-4 md:gap-6"
      action="#"
      onSubmit={handleSubmit(onSubmit)}
    >
      {formError && (
        <Alert color="failure">
          <span className="font-medium">{formError}</span>
        </Alert>
      )}
      <div>
        <div className="mb-2">
          <Label htmlFor="email">Email</Label>
        </div>
        <TextInput
          type="email"
          id="email"
          placeholder="name@company.com"
          required
          autoComplete="email"
          {...register("email")}
          color={errors.email ? "failure" : undefined}
        />
        {errors.email && (
          <HelperText
            color="failure"
            className="mt-1 -mb-4"
          >
            {errors.email.message}
          </HelperText>
        )}
      </div>

      <div>
        <div className="mb-2">
          <Label htmlFor="email">Ваше имя</Label>
        </div>
        <TextInput
          type="text"
          id="name"
          placeholder="Иван"
          required
          autoComplete="name"
          {...register("name")}
          color={errors.name ? "failure" : undefined}
        />
        {errors.name && (
          <HelperText
            color="failure"
            className="mt-1 -mb-4"
          >
            {errors.name.message}
          </HelperText>
        )}
      </div>

      <div>
        <div className="mb-2">
          <Label htmlFor="password">Пароль</Label>
        </div>
        <TextInput
          type="password"
          id="password"
          placeholder="••••••••"
          required
          autoComplete="new-password"
          {...register("password")}
          color={errors.password ? "failure" : undefined}
        />
        {errors.password && (
          <HelperText
            color="failure"
            className="mt-1 -mb-4"
          >
            {errors.password.message}
          </HelperText>
        )}
      </div>

      <div>
        <div className="mb-2">
          <Label htmlFor="confirm-password">Подтвердите пароль</Label>
        </div>
        <TextInput
          type="password"
          id="confirm-password"
          placeholder="••••••••"
          required
          autoComplete="new-password"
          {...register("confirm-password")}
          color={errors["confirm-password"] ? "failure" : undefined}
        />
        {errors["confirm-password"] && (
          <HelperText
            color="failure"
            className="mt-1 -mb-4"
          >
            {errors["confirm-password"].message}
          </HelperText>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="terms"
            required={true}
            {...register("terms")}
            color={errors.terms ? "failure" : undefined}
          />
          <Label htmlFor="terms">
            Я принимаю{" "}
            <Link
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              href="#"
            >
              Условия использования
            </Link>
          </Label>
        </div>
        {errors.terms && (
          <HelperText
            color="failure"
            className="mt-1 -mb-4"
          >
            {errors.terms.message}
          </HelperText>
        )}
      </div>

      <Button
        type="submit"
        className="cursor-pointer"
      >
        Создать аккаунт
      </Button>

      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Уже есть аккаунт?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Войти
        </Link>
      </p>
    </form>
  )
}
