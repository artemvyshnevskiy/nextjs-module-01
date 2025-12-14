"use client"

import Error from "next/error"

export default function PageNotFound() {
  return (
    <Error
      title="Страница не найдена"
      statusCode={404}
    />
  )
}
