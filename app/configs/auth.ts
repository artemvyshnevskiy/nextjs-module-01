import type { AuthOptions } from "next-auth"
import { loginFormSchema } from "../auth/login/_model/schema"
import Credentials from "next-auth/providers/credentials"
import NextAuth from "next-auth/next"
import bcrypt from "bcryptjs"

const users = [
  { id: 1, name: "Anna", email: "test@example.local", password: bcrypt.hashSync("12345678") },
  { id: 2, name: "Vika", email: "vika@example.local", password: "$2b$10$1n0A/kzgiNI1dUJg1WW8OeAvmbIEs5P3BzaT2.GRjPAr0JxV/4Bp." },
]

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET ?? "",
  session: {
    maxAge: 180 * 24 * 60 * 60,
    strategy: "jwt",
  },
  providers: [
    Credentials({
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        const { email, password } = await loginFormSchema.parseAsync(credentials)

        const user = users.find((user) => user.email === email)

        const isPasswordValid = user && bcrypt.compareSync(password, user.password)
        if (!isPasswordValid) {
          throw new Error("Неверная пара email/пароль")
        }

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
