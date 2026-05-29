export type MenuTag = "bestseller" | "spicy" | "vegetarian" | "new" | "chef's pick" | "must try";

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  tags: MenuTag[];
  featured: boolean;
  available: boolean;
  prepTime: number; // minutes
  image: string | null; // null = show gradient placeholder
}

export interface MenuCategory {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "charcoal-grill",
    label: "Charcoal Grill",
    icon: "🔥",
    description: "Slow-grilled over live charcoal for that deep, smoky character",
  },
  {
    id: "steaks",
    label: "Signature Steaks",
    icon: "🥩",
    description: "Restaurant-quality cuts with house-crafted sauces",
  },
  {
    id: "pakistani",
    label: "Pakistani Classics",
    icon: "🍗",
    description: "Bold, traditional flavours rooted in Pakistani home cooking",
  },
  {
    id: "chinese",
    label: "Chinese Delights",
    icon: "🍜",
    description: "Savory stir-fries, aromatic noodles and rich soups",
  },
  {
    id: "rice",
    label: "Rice & Biryani",
    icon: "🍚",
    description: "Fragrant biryanis and pulaos — a Pakistani staple done right",
  },
  {
    id: "soups",
    label: "Soups & Salads",
    icon: "🥗",
    description: "Light starters and fresh accompaniments",
  },
  {
    id: "desserts",
    label: "Desserts",
    icon: "🍮",
    description: "Sweet endings to a perfect meal",
  },
  {
    id: "beverages",
    label: "Beverages",
    icon: "🥤",
    description: "Refreshing drinks and traditional favourites",
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // ── Charcoal Grill ──────────────────────────────────────────────────────────
  {
    id: "cg-01",
    name: "Charcoal Chicken (Full)",
    category: "charcoal-grill",
    description:
      "A whole chicken marinated overnight in Aangan's signature spice blend, then charcoal-grilled low and slow until the skin is perfectly crisped and the inside stays juicy.",
    price: 1750,
    tags: ["bestseller", "must try"],
    featured: true,
    available: true,
    prepTime: 35,
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=800&q=80",
  },
  {
    id: "cg-02",
    name: "Charcoal Chicken (Half)",
    category: "charcoal-grill",
    description:
      "Half portion of our signature charcoal chicken. Same great smoky flavour — ideal for one hungry diner.",
    price: 950,
    tags: ["bestseller"],
    featured: false,
    available: true,
    prepTime: 30,
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=800&q=80",
  },
  {
    id: "cg-03",
    name: "Chicken Tikka (6 pcs)",
    category: "charcoal-grill",
    description:
      "Boneless chicken chunks marinated in yoghurt, lemon and aromatic spices, then cooked on skewers over open coals. Served with mint raita.",
    price: 1100,
    tags: ["spicy", "bestseller"],
    featured: true,
    available: true,
    prepTime: 25,
    image: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=800&q=80",
  },
  {
    id: "cg-04",
    name: "Seekh Kabab (6 pcs)",
    category: "charcoal-grill",
    description:
      "Minced beef and lamb blended with fresh herbs, green chilli and warm spices, hand-formed onto skewers and grilled to a slight char.",
    price: 1200,
    tags: ["spicy", "chef's pick"],
    featured: false,
    available: true,
    prepTime: 20,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
  },
  {
    id: "cg-05",
    name: "Boti Kabab (6 pcs)",
    category: "charcoal-grill",
    description:
      "Cubed beef tenderised in papaya paste then marinated in a smoky spice rub. Charcoal-grilled and served with naan and chutney.",
    price: 1350,
    tags: ["spicy"],
    featured: false,
    available: true,
    prepTime: 30,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
  },
  {
    id: "cg-06",
    name: "Mixed BBQ Platter",
    category: "charcoal-grill",
    description:
      "The full Aangan BBQ experience — half chicken, 4 tikka pieces, 4 seekh kababs and 4 boti kababs. Perfect for sharing with friends or family.",
    price: 3800,
    tags: ["bestseller", "must try", "chef's pick"],
    featured: true,
    available: true,
    prepTime: 40,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
  },

  // ── Signature Steaks ────────────────────────────────────────────────────────
  {
    id: "sk-01",
    name: "Tarragon Steak",
    category: "steaks",
    description:
      "Our signature — a hand-cut beef fillet pan-seared to your liking, finished with a velvety tarragon cream sauce. Served with garlic mashed potatoes and sautéed vegetables.",
    price: 2200,
    tags: ["bestseller", "chef's pick", "must try"],
    featured: true,
    available: true,
    prepTime: 25,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
  },
  {
    id: "sk-02",
    name: "Black Pepper Steak",
    category: "steaks",
    description:
      "Juicy beef fillet with a bold crushed black pepper and butter sauce. Served with seasoned fries and grilled corn.",
    price: 2000,
    tags: ["spicy", "bestseller"],
    featured: false,
    available: true,
    prepTime: 25,
    image: "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=800&q=80",
  },
  {
    id: "sk-03",
    name: "Mushroom Sauce Steak",
    category: "steaks",
    description:
      "Tender beef steak draped in a rich, earthy mushroom and cream sauce. A satisfying combination of rustic and refined.",
    price: 2100,
    tags: ["new"],
    featured: false,
    available: true,
    prepTime: 25,
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
  },
  {
    id: "sk-04",
    name: "Chicken Steak",
    category: "steaks",
    description:
      "A generous boneless chicken breast, marinated and pan-seared, served with your choice of tarragon or black pepper sauce.",
    price: 1600,
    tags: ["bestseller"],
    featured: false,
    available: true,
    prepTime: 20,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",
  },

  // ── Pakistani Classics ───────────────────────────────────────────────────────
  {
    id: "pk-01",
    name: "Chicken Karahi",
    category: "pakistani",
    description:
      "A robust wok-cooked karahi with fresh tomatoes, green chillies, ginger and our house spice blend. Rich, aromatic and deeply satisfying.",
    price: 1500,
    tags: ["spicy", "bestseller", "must try"],
    featured: true,
    available: true,
    prepTime: 25,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80",
  },
  {
    id: "pk-02",
    name: "Chicken Kadhi",
    category: "pakistani",
    description:
      "Tender chicken pieces simmered in a silky, sour yoghurt-based gravy flavoured with mustard seeds and curry leaves. A true comfort dish.",
    price: 1300,
    tags: ["chef's pick"],
    featured: false,
    available: true,
    prepTime: 30,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
  },
  {
    id: "pk-03",
    name: "Crispy Fried Chicken",
    category: "pakistani",
    description:
      "Double-battered chicken pieces fried to a golden crunch. Seasoned with a secret spice mix and served with garlic dip and fries.",
    price: 1400,
    tags: ["bestseller"],
    featured: false,
    available: true,
    prepTime: 20,
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&q=80",
  },
  {
    id: "pk-04",
    name: "Chicken Handi",
    category: "pakistani",
    description:
      "Slow-cooked in a clay handi with cream, cashew paste and whole spices until the chicken melts into a luxuriously thick gravy.",
    price: 1600,
    tags: ["new", "chef's pick"],
    featured: false,
    available: true,
    prepTime: 35,
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80",
  },
  {
    id: "pk-05",
    name: "Mutton Karahi",
    category: "pakistani",
    description:
      "Slow-braised mutton in a fiery charcoal-kissed tomato karahi. The hours of cooking make the meat fall-off-the-bone tender.",
    price: 2800,
    tags: ["spicy", "must try"],
    featured: false,
    available: true,
    prepTime: 45,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80",
  },

  // ── Chinese Delights ─────────────────────────────────────────────────────────
  {
    id: "ch-01",
    name: "Chicken Chow Mein",
    category: "chinese",
    description:
      "Wok-tossed egg noodles with shredded chicken, peppers, spring onions and a savoury soy-ginger sauce. Light yet satisfying.",
    price: 950,
    tags: ["bestseller"],
    featured: false,
    available: true,
    prepTime: 15,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80",
  },
  {
    id: "ch-02",
    name: "Chicken Manchurian",
    category: "chinese",
    description:
      "Crispy chicken nuggets tossed in a tangy, sweet-and-spicy Manchurian sauce with sautéed peppers and spring onions.",
    price: 1050,
    tags: ["spicy", "bestseller"],
    featured: false,
    available: true,
    prepTime: 20,
    image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80",
  },
  {
    id: "ch-03",
    name: "Vegetable Spring Rolls (6 pcs)",
    category: "chinese",
    description:
      "Crispy golden rolls stuffed with stir-fried cabbage, carrots, mushrooms and glass noodles. Served with sweet chilli dipping sauce.",
    price: 650,
    tags: ["vegetarian"],
    featured: false,
    available: true,
    prepTime: 15,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80",
  },

  // ── Rice & Biryani ────────────────────────────────────────────────────────────
  {
    id: "ri-01",
    name: "Chicken Biryani",
    category: "rice",
    description:
      "Aromatic basmati rice slow-cooked with spiced chicken, saffron and caramelised onions. Sealed in a dum pot for maximum fragrance. Served with raita and salad.",
    price: 900,
    tags: ["bestseller", "must try"],
    featured: true,
    available: true,
    prepTime: 20,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80",
  },
  {
    id: "ri-02",
    name: "Mutton Biryani",
    category: "rice",
    description:
      "Rich, full-bodied biryani with tender mutton on the bone, aged basmati and a fragrant masala built over hours.",
    price: 1400,
    tags: ["bestseller", "chef's pick"],
    featured: false,
    available: true,
    prepTime: 25,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80",
  },
  {
    id: "ri-03",
    name: "Chicken Pulao",
    category: "rice",
    description:
      "Subtly spiced long-grain rice cooked in a light chicken yakhni broth with whole spices. Delicate and beautifully fragrant.",
    price: 800,
    tags: [],
    featured: false,
    available: true,
    prepTime: 20,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80",
  },

  // ── Soups & Salads ────────────────────────────────────────────────────────────
  {
    id: "so-01",
    name: "Chicken Corn Soup",
    category: "soups",
    description:
      "A velvety, warming broth with shredded chicken and sweet corn, seasoned with white pepper and a drizzle of sesame oil.",
    price: 450,
    tags: ["bestseller"],
    featured: false,
    available: true,
    prepTime: 10,
    image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?w=800&q=80",
  },
  {
    id: "so-02",
    name: "Hot & Sour Soup",
    category: "soups",
    description:
      "A tangy, fiery broth with mushrooms, tofu, bamboo shoots and a silky egg ribbon. A bold, appetite-awakening starter.",
    price: 500,
    tags: ["spicy", "vegetarian"],
    featured: false,
    available: true,
    prepTime: 10,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80",
  },
  {
    id: "so-03",
    name: "Fresh Garden Salad",
    category: "soups",
    description:
      "Crisp lettuce, cucumber, tomato, onion and olives tossed in a house lemon-herb dressing. Light and refreshing.",
    price: 350,
    tags: ["vegetarian"],
    featured: false,
    available: true,
    prepTime: 5,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
  },

  // ── Desserts ──────────────────────────────────────────────────────────────────
  {
    id: "de-01",
    name: "Gulab Jamun (4 pcs)",
    category: "desserts",
    description:
      "Soft milk-solid dumplings soaked in rose-scented sugar syrup. Served warm with a scoop of vanilla ice cream.",
    price: 400,
    tags: ["bestseller"],
    featured: false,
    available: true,
    prepTime: 5,
    image: "https://images.unsplash.com/photo-1601303516534-bf435a602c68?w=800&q=80",
  },
  {
    id: "de-02",
    name: "Kheer",
    category: "desserts",
    description:
      "Slow-simmered rice pudding with whole milk, cardamom, saffron and a garnish of crushed pistachios and dried rose petals.",
    price: 380,
    tags: ["vegetarian"],
    featured: false,
    available: true,
    prepTime: 5,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
  },
  {
    id: "de-03",
    name: "Chocolate Lava Cake",
    category: "desserts",
    description:
      "Warm dark chocolate fondant with a molten flowing centre. Served with vanilla ice cream and a dusting of cocoa powder.",
    price: 650,
    tags: ["new", "must try"],
    featured: false,
    available: true,
    prepTime: 15,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80",
  },

  // ── Beverages ─────────────────────────────────────────────────────────────────
  {
    id: "bv-01",
    name: "Rooh Afza Lassi",
    category: "beverages",
    description:
      "Thick, creamy yoghurt blended with Rooh Afza rose syrup and a hint of cardamom. A classic Pakistani refresher.",
    price: 350,
    tags: ["bestseller", "vegetarian"],
    featured: false,
    available: true,
    prepTime: 5,
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80",
  },
  {
    id: "bv-02",
    name: "Fresh Lime Soda",
    category: "beverages",
    description:
      "Sparkling soda with freshly squeezed lime, a pinch of black salt and chaat masala. Sweet or salted on request.",
    price: 280,
    tags: ["vegetarian"],
    featured: false,
    available: true,
    prepTime: 3,
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&q=80",
  },
  {
    id: "bv-03",
    name: "Mango Shake",
    category: "beverages",
    description:
      "Thick milkshake made from real Sindhri mangoes, whole milk and a touch of sugar. Available in season.",
    price: 400,
    tags: ["new", "vegetarian"],
    featured: false,
    available: true,
    prepTime: 5,
    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&q=80",
  },
  {
    id: "bv-04",
    name: "Mineral Water",
    category: "beverages",
    description: "Chilled still mineral water — Nestle or Kinley.",
    price: 100,
    tags: [],
    featured: false,
    available: true,
    prepTime: 1,
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80",
  },
];

/** Tag display config */
export const TAG_STYLES: Record<
  MenuTag,
  { label: string; bg: string; text: string; border: string }
> = {
  bestseller:    { label: "Bestseller",   bg: "#C8860A20", text: "#C8860A", border: "#C8860A40" },
  spicy:         { label: "Spicy",        bg: "#EF444420", text: "#EF4444", border: "#EF444440" },
  vegetarian:    { label: "Veg",          bg: "#22C55E20", text: "#22C55E", border: "#22C55E40" },
  new:           { label: "New",          bg: "#3B82F620", text: "#3B82F6", border: "#3B82F640" },
  "chef's pick": { label: "Chef's Pick",  bg: "#8B5CF620", text: "#8B5CF6", border: "#8B5CF640" },
  "must try":    { label: "Must Try",     bg: "#EC489920", text: "#EC4899", border: "#EC489940" },
};
