import { prisma } from "../app/libs/prisma.ts"

const chefs = [
  {
    name: "Антонио Росси",
    bio: "Итальянская кухня, паста и соусы.",
    recipes: [
      {
        title: "Спагетти Карбонара",
        description: "Классическая итальянская паста.",
        imageUrl: "/images/carbonara.jpg",
        tagNames: ["итальянская кухня", "паста", "классика", "быстро"],
        ingredients: [
          { name: "Спагетти", amount: "200 г" },
          { name: "Яйца", amount: "2 шт" },
          { name: "Пармезан", amount: "50 г" },
          { name: "Бекон", amount: "100 г" },
        ],
      },
    ],
  },
  {
    name: "Мария Конти",
    bio: "Пицца, тесто и выпечка.",
    recipes: [
      {
        title: "Пицца Маргарита",
        description: "Свежая пицца с помидорами, базиликом и моцареллой.",
        imageUrl: "/images/pizza.jpg",
        tagNames: ["итальянская кухня", "пицца", "классика"],
        ingredients: [
          { name: "Тесто", amount: "1 шт" },
          { name: "Томаты", amount: "2 шт" },
          { name: "Моцарелла", amount: "100 г" },
          { name: "Базилик", amount: "по вкусу" },
        ],
      },
    ],
  },
  {
    name: "Пьер Дюран",
    bio: "Классические соусы и салаты.",
    recipes: [
      {
        title: "Салат Цезарь",
        description: "Салат с салатом романо, гренками и соусом Цезарь.",
        imageUrl: "/images/salad.jpg",
        tagNames: ["салат", "классика", "быстро"],
        ingredients: [
          { name: "Салат романо", amount: "100 г" },
          { name: "Гренки", amount: "50 г" },
          { name: "Соус Цезарь", amount: "30 г" },
          { name: "Пармезан", amount: "20 г" },
        ],
      },
    ],
  },
]

async function main() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "RecipeTag",
      "Ingredient",
      "Recipe",
      "Tag",
      "Chef"
    RESTART IDENTITY
    CASCADE;
  `)

  for (const chef of chefs) {
    await prisma.chef.create({
      data: {
        name: chef.name,
        bio: chef.bio,
        recipes: {
          create: chef.recipes.map((recipe) => ({
            title: recipe.title,
            description: recipe.description,
            imageUrl: recipe.imageUrl,

            ingredients: { create: recipe.ingredients },

            tags: {
              create: recipe.tagNames.map((name) => ({
                tag: {
                  connectOrCreate: {
                    where: { name },
                    create: { name },
                  },
                },
              })),
            },
          })),
        },
      },
    })
  }

  console.log("Seed.ts применен")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
