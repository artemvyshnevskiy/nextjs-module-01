"use client"

import Link from "next/link"
import { TextInput, Label, Checkbox, Button, HelperText } from "flowbite-react"
import { loginFormSchema, loginFormSchemaType } from "../_model/schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { Alert } from "flowbite-react"
import { useRouter } from "next/navigation"

type LoginFormProps = {
  callbackUrl: string
}

export default function LoginForm({ callbackUrl }: LoginFormProps) {
  const [authError, setAuthError] = useState<string | null>(null)
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      router.push(callbackUrl)
    }
  }, [callbackUrl, router, session])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "test@example.local",
      password: "",
    },
  })

  const onSubmit = async (data: loginFormSchemaType) => {
    setAuthError(null)

    const { email, password } = data
    const result = await signIn("credentials", { email, password, redirect: false, callbackUrl: callbackUrl })

    if (result?.ok) {
      router.push(callbackUrl)
    } else {
      setAuthError("Неверная пара email/пароль. Попробуйте снова")
    }
  }

  return (
    <form
      className="flex flex-col gap-4 md:gap-6"
      action="#"
      onSubmit={handleSubmit(onSubmit)}
    >
      {authError && (
        <Alert color="failure">
          <span className="font-medium">{authError}</span>
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
          {...register("email")}
          color={errors.email ? "failure" : undefined}
        />
        {errors.email && <HelperText color="failure">{errors.email.message}</HelperText>}
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
          {...register("password")}
          color={errors.password ? "failure" : undefined}
        />
        {errors.password && <HelperText color="failure">{errors.password.message}</HelperText>}
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
