import z from "zod"

export const loginFormSchema = z.object({
  email: z.email({ error: "Некорректный Email" }),
  password: z.string().min(8, { error: "Пароль должен содержать минимум 8 символов" }),
})

export type loginFormSchemaType = z.infer<typeof loginFormSchema>
