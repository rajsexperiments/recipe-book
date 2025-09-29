export interface SopCategory {
  title: string;
  items: {
    title: string;
    content: string[];
  }[];
}
export const sops: SopCategory[] = [
  {
    title: 'Morning Mise-en-Place Checklist',
    items: [
      {
        title: 'Daily Sign-off',
        content: [
          'A laminated checklist to be signed off by the Head Chef daily.',
          'Batters (Ragi, Millet Dosa) checked for fermentation (pH 4.5-5.0).',
          'Grains (Foxtail, Little) roasted and stored.',
          'Dal pressure-cooked.',
          'Mother Gravy prepared and tasted.',
          'Chutneys (Peanut, Mint, Coconut) ground fresh.',
          'Vegetable stations filled and labeled.',
        ],
      },
    ],
  },
  {
    title: 'Equipment Usage',
    items: [
      {
        title: 'Wet Grinder',
        content: ['Clean with hot water immediately after use to prevent hardened batter.'],
      },
      {
        title: 'Tawas (Griddles)',
        content: [
          'Season cast-iron tawas daily.',
          'Never wash with soap; scrub with salt and oil.',
          'Use separate tawas for dosa (flat) and roti (concave).',
        ],
      },
    ],
  },
  {
    title: 'Safety Notes',
    items: [
      {
        title: 'Handling Hot Dough',
        content: ['Always use hot water to make Jowar/Ragi roti dough, but handle with care to avoid burns.'],
      },
      {
        title: 'Allergen Management',
        content: [
          'Clearly label all allergen-containing ingredients (Nuts, Dairy).',
          'Use separate chopping boards for paneer.',
        ],
      },
    ],
  },
];