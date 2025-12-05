export default function EnvPage() {
  const apiToken = process.env.API_TOKEN
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  return (
    <>
      <div>{apiToken}</div>
      <div>{apiUrl}</div>
    </>
  )
}
