import z from "zod"
import { Decimal } from "@prisma/client/runtime/client"
import { Rating as FlowbiteRating, RatingStar } from "flowbite-react"

type RatingProps = {
  value: Decimal | number | null
}

const ratingSchema = z.object({
  value: z.preprocess((value) => {
    return Number(value)
  }, z.number().min(1.0).max(5.0)),
})

export default function Rating(props: RatingProps) {
  const parsedProps = ratingSchema.safeParse(props)
  const value = parsedProps.data?.value

  if (!value) {
    return (
      <FlowbiteRating>
        <RatingStar filled={false} />
        <span className="ms-1 text-sm">Нет оценок</span>
      </FlowbiteRating>
    )
  }

  const roundedValue = Math.round(value)
  const stars = []
  for (let i = 0; i < 5; i++) {
    stars.push(
      <RatingStar
        key={i}
        filled={roundedValue > i}
      />
    )
  }

  const formatRating = (value: number) => {
    const fixed = value.toFixed(2)
    return fixed.replace(/(\.\d)0$/, "$1")
  }

  return (
    <FlowbiteRating>
      {stars}
      <span className="ms-1 text-sm">{formatRating(value)}</span>
    </FlowbiteRating>
  )
}
