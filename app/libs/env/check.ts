import z, { ZodError } from "zod"

export const schema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
  API_TOKEN: z.string().length(10),
  NEXT_PUBLIC_MAIN_RECIPE_ID: z.coerce.number().optional(),
  //EXAMPLE: z.enum(["DEMO", "ON", "OFF"]).optional(),
  DATABASE_URL: z.string(),
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
