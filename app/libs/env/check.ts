import z, { ZodError } from "zod"

export const schema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
  API_TOKEN: z.string().length(10),
  //NEXT_PUBLIC_FEATURED_RECIPE_IDS: z.coerce.number().optional(),
  NEXT_PUBLIC_FEATURED_RECIPE_IDS: z
    .preprocess((value) => {
      if (typeof value !== "string") return value

      try {
        return JSON.parse(value)
      } catch {
        return value
      }
    }, z.array(z.number().int().positive()))
    .optional(),
  //EXAMPLE: z.enum(["DEMO", "ON", "OFF"]).optional(),
  DATABASE_URL: z.string(),
  NEXTAUTH_SECRET: z
    .string()
    .length(44)
    .regex(/^[A-Za-z0-9+/]+={0,2}$/),
})

async function main() {
  schema.parse(process.env)
}

main().catch((e) => {
  if (e instanceof ZodError) {
    console.error(e.message)
  }

  process.exit(1)
})
