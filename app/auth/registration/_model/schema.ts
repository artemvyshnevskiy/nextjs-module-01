import z from "zod"

export const registrationFormSchema = z
  .object({
    email: z.email({ error: "Некорректный Email" }),
    name: z
      .string()
      .trim()
      .min(2, { error: "Имя должно содержать минимум 2 символа" })
      .max(50, { error: "Имя должно содержать не более 50 символов" })
      .regex(/^[A-Za-zА-Яа-яЁё\- ]+$/, {
        error: "Имя может содержать только буквы, пробелы и дефис",
      }),
    password: z
      .string()
      .min(8, { error: "Пароль должен содержать минимум 8 символов" })
      .regex(/^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]+$/, {
        error: "Пароль может содержать только латинские буквы, цифры и спецсимволы",
      }),
    "confirm-password": z.string(),
    terms: z.boolean().refine((value) => value, { message: "Вы должны принять условия" }),
  })
  .refine((data) => data.password === data["confirm-password"], {
    message: "Пароли должны совпадать",
    path: ["confirm-password"],
  })

export type registrationFormSchemaType = z.infer<typeof registrationFormSchema>
