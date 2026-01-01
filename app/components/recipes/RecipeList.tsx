import RecipeCard from "./RecipeCard"

interface RecipeListProps {
  recipes: RecipeWithRelations[]
}

export default function RecipeList({ recipes }: RecipeListProps) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe: RecipeWithRelations) => (
        <RecipeCard
          key={recipe.id}
          {...recipe}
        />
      ))}
    </ul>
  )
}
