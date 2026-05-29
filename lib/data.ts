export const RESTAURANT = {
  name: "Aangan Restaurant",
  tagline: "Delicious BBQ and more. Join us on our rooftop for a tasty meal with a view.",
  type: "Rooftop Restaurant",
  dineInOnly: true,
  address: "Top Floor, Xin Mall, Queens Road, Phase Mansoorabad, Sargodha, Punjab, Pakistan",
  phones: [
    { label: "Main", number: "+92 332 8665554", href: "tel:+923328665554" },
    { label: "Alt 1", number: "+92 301 1794545", href: "tel:+923011794545" },
    { label: "Alt 2", number: "048-3769989", href: "tel:04837699890" },
  ],
  rating: 4.2,
  reviewCount: 462,
  priceRange: { min: 1000, max: 6000, currency: "Rs" },
  instagram: "https://www.instagram.com/aanganrestaurantsgd/",
  facebook: "https://www.facebook.com/Aanganrestaurantsgd/",
  instagramHandle: "@aanganrestaurantsgd",
  mapsUrl:
    "https://www.google.com/maps/place/aangan+restaurant/data=!4m2!3m1!1s0x392177b94ab4bea5:0xa6203d33ae3f819a",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.4186!2d72.6731!3d32.0836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392177b94ab4bea5%3A0xa6203d33ae3f819a!2sAangan%20Restaurant!5e0!3m2!1sen!2s!4v1700000000000",
} as const;

export const MENU_ITEMS = [
  {
    icon: "🔥",
    title: "Charcoal Grill",
    description:
      "Tender, smoky meats grilled over live charcoal. Our most loved specialty — infused with that irresistible charred depth.",
  },
  {
    icon: "🥩",
    title: "Signature Steaks",
    description:
      "Indulge in our Tarragon Steak, grilled to perfection and topped with a rich, creamy tarragon sauce.",
  },
  {
    icon: "🍗",
    title: "Pakistani Classics",
    description:
      "From aromatic Chicken Kadhi to crispy fried chicken, each dish is rooted in bold, traditional spice.",
  },
  {
    icon: "🍜",
    title: "Chinese Delights",
    description:
      "Savory noodles, rich stir-fries, and aromatic soups — a burst of flavour for something different.",
  },
  {
    icon: "🍚",
    title: "Rice & Biryani",
    description:
      "Fragrant biryani and flavorful pulao paired with rich curries — a true Pakistani staple done right.",
  },
  {
    icon: "🥗",
    title: "Soups & Salads",
    description:
      "Light, fresh starters to complement your meal. Perfect for vegetarians and light eaters alike.",
  },
] as const;

export const REVIEWS = [
  {
    id: 1,
    name: "Muhammad Ali K.",
    initials: "MA",
    rating: 5,
    text: "The rooftop view alone is worth the visit. The charcoal chicken was absolutely incredible, smoke flavor just right. Will be back!",
  },
  {
    id: 2,
    name: "Sara N.",
    initials: "SN",
    rating: 4,
    text: "Best date night spot in Sargodha, hands down. Ambiance is beautiful at night, food was delicious. Tarragon steak is a must-try.",
  },
  {
    id: 3,
    name: "Bilal R.",
    initials: "BR",
    rating: 5,
    text: "Came here with family for dinner. Biryani was fragrant and the BBQ platter was amazing. Service was quick and friendly.",
  },
  {
    id: 4,
    name: "Hina M.",
    initials: "HM",
    rating: 5,
    text: "Wow. Honestly did not expect food this good in Sargodha. The chicken karahi was rich and perfectly spiced. Rooftop setting makes it special.",
  },
  {
    id: 5,
    name: "Usman F.",
    initials: "UF",
    rating: 4,
    text: "Great experience overall. The steak here surprised me — restaurant quality you'd expect in Lahore. Price is very reasonable.",
  },
  {
    id: 6,
    name: "Fatima J.",
    initials: "FJ",
    rating: 5,
    text: "The crispy fried chicken and the view of the city at night — doesn't get better than this. Highly recommend for groups.",
  },
  {
    id: 7,
    name: "Kamran D.",
    initials: "KD",
    rating: 4,
    text: "Chinese noodles were surprisingly authentic. Clean environment, great staff. We visited on a weekend and it was worth the wait.",
  },
  {
    id: 8,
    name: "Zara Q.",
    initials: "ZQ",
    rating: 5,
    text: "Aangan is our go-to for special occasions. The atmosphere is warm, food is consistent, and the rooftop breeze is refreshing.",
  },
] as const;

export const NAV_LINKS = [
  { label: "About",   href: "#about"   },
  { label: "Menu",    href: "/menu"    },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit Us",href: "#visit"   },
] as const;
