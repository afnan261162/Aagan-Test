export type GalleryImage = {
  id: string;
  slot: string;   // e.g. "rooftop-ambiance" — stable filename key
  label: string;  // human label shown in admin and on hover
  url: string | null; // null = show gradient placeholder
  alt: string;
};

export const DEFAULT_GALLERY: GalleryImage[] = [
  { id: "g1", slot: "rooftop-ambiance",  label: "Rooftop Ambiance",   url: null, alt: "Rooftop ambiance at Aangan Restaurant" },
  { id: "g2", slot: "city-view",         label: "City View at Night", url: null, alt: "City view from Aangan rooftop at night" },
  { id: "g3", slot: "table-setting",     label: "Table Setting",      url: null, alt: "Elegant table setting at Aangan" },
  { id: "g4", slot: "charcoal-grill",    label: "Charcoal Grill",     url: null, alt: "Live charcoal grill at Aangan" },
  { id: "g5", slot: "signature-dishes",  label: "Signature Dishes",   url: null, alt: "Signature dishes at Aangan Restaurant" },
  { id: "g6", slot: "bbq-platter",       label: "BBQ Platter",        url: null, alt: "BBQ platter at Aangan Restaurant" },
];
