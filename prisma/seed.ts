import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: "Single Origin", slug: "single-origin" },
    { name: "Blends", slug: "blends" },
    { name: "Espresso", slug: "espresso" },
    { name: "Decaf", slug: "decaf" },
  ];

  const createdCategories = await Promise.all(
    categories.map((category) =>
      prisma.category.upsert({
        where: { slug: category.slug },
        update: {},
        create: category,
      }),
    ),
  );

  const products = [
    {
      slug: "ethiopian-yirgacheffe",
      name: "Ethiopian Yirgacheffe",
      description: "Floral, citrusy, and delicately sweet with a tea-like body and sparkling finish.",
      tastingNotes: ["Lemon blossom", "Blueberry", "Cacao nib"],
      roastLevel: "Light",
      origin: "Ethiopia",
      basePrice: 2600,
      stock: 18,
      images: [
        "https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=1200&q=80",
      ],
      categoryName: "Single Origin",
      variants: [
        { weight: 250, grind: "Whole bean", price: 2600, stock: 6 },
        { weight: 500, grind: "Pour over", price: 4900, stock: 6 },
        { weight: 1000, grind: "Whole bean", price: 9500, stock: 6 },
      ],
    },
    {
      slug: "colombian-supremo",
      name: "Colombian Supremo",
      description: "A balanced and caramel-rich cup with layered sweetness and a silky finish.",
      tastingNotes: ["Caramel", "Orange zest", "Toffee"],
      roastLevel: "Medium",
      origin: "Colombia",
      basePrice: 2400,
      stock: 24,
      images: [
        "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80",
      ],
      categoryName: "Single Origin",
      variants: [
        { weight: 250, grind: "Whole bean", price: 2400, stock: 10 },
        { weight: 500, grind: "Drip", price: 4700, stock: 10 },
        { weight: 1000, grind: "Whole bean", price: 8800, stock: 4 },
      ],
    },
    {
      slug: "brewcraft-espresso",
      name: "BrewCraft Espresso",
      description: "Sweet, syrupy, and deeply chocolatey with red-fruit brightness.",
      tastingNotes: ["Dark chocolate", "Red fruit", "Hazelnut"],
      roastLevel: "Espresso",
      origin: "Blend",
      basePrice: 3000,
      stock: 18,
      images: ["https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1200&q=80"],
      categoryName: "Espresso",
      variants: [
        { weight: 250, grind: "Espresso", price: 3000, stock: 8 },
        { weight: 500, grind: "Espresso", price: 5600, stock: 10 },
      ],
    },
  ];

  for (const product of products) {
    const category = createdCategories.find((item) => item.name === product.categoryName);

    if (!category) continue;

    const created = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        slug: product.slug,
        name: product.name,
        description: product.description,
        tastingNotes: product.tastingNotes,
        roastLevel: product.roastLevel,
        origin: product.origin,
        basePrice: product.basePrice,
        stock: product.stock,
        images: product.images,
        categoryId: category.id,
      },
    });

    for (const variant of product.variants) {
      await prisma.productVariant.upsert({
        where: {
          id: `${created.id}-${variant.weight}-${variant.grind}`,
        },
        update: {},
        create: {
          id: `${created.id}-${variant.weight}-${variant.grind}`,
          productId: created.id,
          weight: variant.weight,
          grind: variant.grind,
          price: variant.price,
          stock: variant.stock,
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
