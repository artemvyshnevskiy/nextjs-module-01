import LoginForm from "./_components/LoginForm"

type LoginPageProps = {
  searchParams: Promise<{ [key: string]: string[] | string | undefined }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = await searchParams
  const rawCallbackUrl = resolvedSearchParams?.callbackUrl
  const callbackUrl = typeof rawCallbackUrl === "string" ? rawCallbackUrl : "/"

  return (
    <section className="h-full flex flex-col justify-center">
      <div className="mx-auto w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Войти в аккаунт</h1>
          <LoginForm callbackUrl={callbackUrl} />
        </div>
      </div>
    </section>
  )
}
