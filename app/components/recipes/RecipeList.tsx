import RecipeCard from "./RecipeCard"
import { RecipeCardProps } from "./RecipeCard"

interface Recipe {
  id: number
  title: string
  description: string
  image: string
}

interface RecipeListProps {
  recipes: RecipeCardProps[]
}

export default function RecipeList({ recipes }: RecipeListProps) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe: Recipe) => (
        <RecipeCard
          key={recipe.id}
          {...recipe}
        />
      ))}
    </ul>
  )
}
