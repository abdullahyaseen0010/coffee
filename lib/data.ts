import { Coffee, FlaskConical, Sunset, Waves, type LucideIcon } from "lucide-react";

export type Product = {
  id: number;
  slug: string;
  name: string;
  description: string;
  tastingNotes: string[];
  roastLevel: "Light" | "Medium" | "Dark" | "Espresso";
  origin: string;
  category: string;
  basePrice: number;
  featured: boolean;
  rating: number;
  reviews: number;
  images: string[];
  badge?: string;
  grindOptions: string[];
  weightOptions: number[];
  stock: number;
};

export type BrewingMethod = {
  title: string;
  description: string;
  icon: LucideIcon;
};

/**
 * Coffee photos (all hosted on images.unsplash.com, the same photos used on the live site).
 * Swap any ID here and every product that uses it updates.
 */
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

const photos = {
  pourOver: unsplash("1497636577773-f1231844b336"),
  cupAndBeans: unsplash("1442512595331-e89e73853f31"),
  espressoShot: unsplash("1504753793650-d4a2b783c15e"),
  darkRoast: unsplash("1447933601403-0c6688de566e"),
  cupOnSaucer: unsplash("1461023058943-07fcbe16d735"),
  latteArt: unsplash("1559056199-641a0ac8b55e"),
  cafeTable: unsplash("1521017432531-fbd92d768814"),
  morningCup: unsplash("1459755486867-b55449bb39ff"),
  roastedBeans: unsplash("1498804103079-a6351b050096"),
};

export const products: Product[] = [
  {
    id: 1,
    slug: "ethiopian-yirgacheffe",
    name: "Ethiopian Yirgacheffe",
    description: "Floral, citrusy, and delicately sweet with a tea-like body and sparkling finish.",
    tastingNotes: ["Lemon blossom", "Blueberry", "Cacao nib"],
    roastLevel: "Light",
    origin: "Ethiopia",
    category: "Single Origin",
    basePrice: 26,
    featured: true,
    rating: 4.9,
    reviews: 240,
    images: [photos.pourOver, photos.cafeTable, photos.cupOnSaucer],
    badge: "New arrival",
    grindOptions: ["Whole bean", "Espresso", "French press", "Pour over"],
    weightOptions: [250, 500, 1000],
    stock: 18,
  },
  {
    id: 2,
    slug: "colombian-supremo",
    name: "Colombian Supremo",
    description: "A balanced and caramel-rich cup with layered sweetness and a silky finish.",
    tastingNotes: ["Caramel", "Orange zest", "Toffee"],
    roastLevel: "Medium",
    origin: "Colombia",
    category: "Single Origin",
    basePrice: 24,
    featured: true,
    rating: 4.8,
    reviews: 198,
    images: [photos.cupAndBeans, photos.morningCup, photos.darkRoast],
    grindOptions: ["Whole bean", "Pour over", "Drip"],
    weightOptions: [250, 500, 1000],
    stock: 24,
  },
  {
    id: 3,
    slug: "blue-mountain-reserve",
    name: "Blue Mountain Reserve",
    description: "Smooth and refined with notes of cocoa, brown sugar, and toasted almond.",
    tastingNotes: ["Cocoa", "Walnut", "Brown sugar"],
    roastLevel: "Medium",
    origin: "Jamaica",
    category: "Espresso",
    basePrice: 32,
    featured: true,
    rating: 4.9,
    reviews: 152,
    images: [photos.espressoShot, photos.latteArt, photos.roastedBeans],
    badge: "Premium",
    grindOptions: ["Whole bean", "Espresso", "French press"],
    weightOptions: [250, 500],
    stock: 12,
  },
  {
    id: 4,
    slug: "italian-dark-roast",
    name: "Italian Dark Roast",
    description: "Bold and full-bodied with bittersweet cocoa and a smoky finish for espresso lovers.",
    tastingNotes: ["Dark chocolate", "Molasses", "Smoke"],
    roastLevel: "Dark",
    origin: "Italy",
    category: "Espresso",
    basePrice: 27,
    featured: true,
    rating: 4.7,
    reviews: 186,
    images: [photos.darkRoast, photos.espressoShot, photos.latteArt],
    grindOptions: ["Whole bean", "Espresso", "French press"],
    weightOptions: [250, 500, 1000],
    stock: 28,
  },
  {
    id: 5,
    slug: "hawaiian-kona",
    name: "Hawaiian Kona",
    description: "A smooth, silky cup with almond sweetness and a clean, lingering finish.",
    tastingNotes: ["Almond", "Honey", "Citrus peel"],
    roastLevel: "Medium",
    origin: "Hawaii",
    category: "Single Origin",
    basePrice: 35,
    featured: false,
    rating: 4.9,
    reviews: 130,
    images: [photos.cupOnSaucer, photos.pourOver, photos.cupAndBeans],
    grindOptions: ["Whole bean", "Pour over", "Drip"],
    weightOptions: [250, 500],
    stock: 11,
  },
  {
    id: 6,
    slug: "french-vanilla-blend",
    name: "French Vanilla Blend",
    description: "Round, creamy, and comforting with vanilla bean, caramel, and soft cocoa depth.",
    tastingNotes: ["Vanilla", "Caramel", "Cocoa"],
    roastLevel: "Medium",
    origin: "Blend",
    category: "Blends",
    basePrice: 22,
    featured: false,
    rating: 4.6,
    reviews: 214,
    images: [photos.latteArt, photos.morningCup, photos.roastedBeans],
    badge: "Best seller",
    grindOptions: ["Whole bean", "Espresso", "Drip"],
    weightOptions: [250, 500, 1000],
    stock: 35,
  },
  {
    id: 7,
    slug: "guatemala-antigua",
    name: "Guatemala Antigua",
    description: "Bright and layered with berry sweetness, citrus, and a clean cocoa finish.",
    tastingNotes: ["Berry", "Citrus", "Cocoa"],
    roastLevel: "Light",
    origin: "Guatemala",
    category: "Single Origin",
    basePrice: 28,
    featured: false,
    rating: 4.8,
    reviews: 142,
    images: [photos.cafeTable, photos.cupAndBeans, photos.pourOver],
    grindOptions: ["Whole bean", "Pour over", "French press"],
    weightOptions: [250, 500],
    stock: 20,
  },
  {
    id: 8,
    slug: "sumatra-mandheling",
    name: "Sumatra Mandheling",
    description: "Earthy and syrupy with dark chocolate, cedar, and a decadent finish.",
    tastingNotes: ["Dark chocolate", "Cedar", "Plum"],
    roastLevel: "Dark",
    origin: "Indonesia",
    category: "Single Origin",
    basePrice: 29,
    featured: false,
    rating: 4.7,
    reviews: 118,
    images: [photos.cupOnSaucer, photos.darkRoast, photos.espressoShot],
    grindOptions: ["Whole bean", "French press", "Espresso"],
    weightOptions: [250, 500, 1000],
    stock: 16,
  },
  {
    id: 9,
    slug: "morning-ritual-blend",
    name: "Morning Ritual Blend",
    description: "Balanced, nutty, and silky with a comforting cocoa finish for everyday sipping.",
    tastingNotes: ["Hazelnut", "Cocoa", "Brown sugar"],
    roastLevel: "Medium",
    origin: "Blend",
    category: "Blends",
    basePrice: 23,
    featured: false,
    rating: 4.8,
    reviews: 266,
    images: [photos.morningCup, photos.cafeTable, photos.roastedBeans],
    grindOptions: ["Whole bean", "Drip", "Pour over"],
    weightOptions: [250, 500],
    stock: 41,
  },
  {
    id: 10,
    slug: "decaf-sunrise",
    name: "Decaf Sunrise",
    description: "A mellow cup of cocoa sweetness and toasted almond with zero compromise on flavor.",
    tastingNotes: ["Toasted almond", "Cocoa", "Orange blossom"],
    roastLevel: "Medium",
    origin: "Peru",
    category: "Decaf",
    basePrice: 25,
    featured: false,
    rating: 4.7,
    reviews: 105,
    images: [photos.roastedBeans, photos.cupOnSaucer, photos.cupAndBeans],
    grindOptions: ["Whole bean", "French press", "Drip"],
    weightOptions: [250, 500, 1000],
    stock: 22,
  },
  {
    id: 11,
    slug: "brewcraft-espresso",
    name: "BrewCraft Espresso",
    description: "A sweet, syrupy espresso with notes of dark chocolate and red fruit.",
    tastingNotes: ["Red fruit", "Dark chocolate", "Hazelnut"],
    roastLevel: "Espresso",
    origin: "Blend",
    category: "Espresso",
    basePrice: 30,
    featured: false,
    rating: 4.9,
    reviews: 176,
    images: [photos.latteArt, photos.espressoShot, photos.darkRoast],
    badge: "Espresso pick",
    grindOptions: ["Whole bean", "Espresso"],
    weightOptions: [250, 500],
    stock: 18,
  },
  {
    id: 12,
    slug: "kenya-ntima",
    name: "Kenya Ntima",
    description: "Lively and berry-forward with a crisp finish and tea-like elegance.",
    tastingNotes: ["Berry", "Grapefruit", "Black tea"],
    roastLevel: "Light",
    origin: "Kenya",
    category: "Single Origin",
    basePrice: 31,
    featured: false,
    rating: 4.8,
    reviews: 144,
    images: [photos.cupAndBeans, photos.cafeTable, photos.morningCup],
    grindOptions: ["Whole bean", "Pour over", "Drip"],
    weightOptions: [250, 500, 1000],
    stock: 14,
  },
];

export const featuredProducts = products.filter((product) => product.featured);

export const testimonials = [
  { name: "Ava M.", role: "Product designer", quote: "The flavor clarity is exceptional. Every cup feels considered and premium.", rating: 5 },
  { name: "Theo R.", role: "Freelance writer", quote: "It tastes like a café ritual without the busy rush. The delivery and freshness are excellent.", rating: 5 },
  { name: "Nina S.", role: "Creative lead", quote: "The single origins really do have their own story. I keep coming back for the Ethiopian roast.", rating: 5 },
];

export const brewingMethods: BrewingMethod[] = [
  { title: "Pour over", description: "Bright, floral clarity with slower extraction and a delicate finish.", icon: Coffee },
  { title: "French press", description: "A full-bodied, textured cup with soft oils and a rich, sweet body.", icon: FlaskConical },
  { title: "Espresso", description: "Thick, sweet, and concentrated for lattes, cappuccinos, and short pours.", icon: Sunset },
  { title: "Cold brew", description: "Smooth, mellow, and naturally sweet for slow afternoons and warm days.", icon: Waves },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

export const getProductBySlug = (slug: string) => products.find((product) => product.slug === slug);

export const relatedProducts = (slug: string) =>
  products.filter((product) => product.slug !== slug).slice(0, 4);