export type GalleryImage = {
  id: string;
  slot: string;   // stable filename key
  label: string;  // human label shown in admin and on hover
  url: string | null; // null = show gradient placeholder
  alt: string;
};

export const DEFAULT_GALLERY: GalleryImage[] = [
  {
    id: "g1",
    slot: "rooftop-ambiance",
    label: "Rooftop Ambiance",
    url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=85",
    alt: "Rooftop restaurant ambiance at night",
  },
  {
    id: "g2",
    slot: "city-view",
    label: "City View at Night",
    url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=85",
    alt: "City lights at night view",
  },
  {
    id: "g3",
    slot: "table-setting",
    label: "Table Setting",
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85",
    alt: "Elegant restaurant table setting",
  },
  {
    id: "g4",
    slot: "charcoal-grill",
    label: "Charcoal Grill",
    url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=85",
    alt: "Live charcoal BBQ grill",
  },
  {
    id: "g5",
    slot: "signature-dishes",
    label: "Signature Dishes",
    url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=85",
    alt: "Signature dishes spread",
  },
  {
    id: "g6",
    slot: "bbq-platter",
    label: "BBQ Platter",
    url: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=1200&q=85",
    alt: "BBQ mixed grill platter",
  },
];
