// src/data/categories.js
// Metadata and helpers for product categories/collections.

// Metadata keyed by category id (product.type).
export const categoryMetadata = {
  cake: {
    label: 'Signature cakes',
    copy: 'Layered bases with fruit-first fillings and light chantilly for centrepiece celebrations.',
    order: 1,
    subcategories: [
      { id: 'kids', label: 'Kids cakes' },
      { id: 'bento', label: 'Bento cakes' },
      { id: 'vintage', label: 'Vintage cakes' },
    ],
  },
  'cinnamon-roll': {
    label: 'Cinnabons',
    copy: 'Slow-proofed rolls with buttery spirals and bright glazes that stay soft for hours.',
    order: 2,
    subcategories: [],
  },
  tart: {
    label: 'Bright tarts',
    copy: 'Crisp pâte sablée shells with citrus curds, pralines, and roasted nuts.',
    order: 3,
    subcategories: [],
  },
  cupcakes: {
    label: 'Cupcakes',
    copy: 'Individual sponge bases topped with light whipped frostings.',
    order: 4,
    subcategories: [],
  },
};

export function formatCategoryId(id = '') {
  return id
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function deriveCategories(productList = []) {
  const productsByCategory = new Map();

  for (const product of productList || []) {
    if (!product?.type) continue;
    if (!productsByCategory.has(product.type)) {
      productsByCategory.set(product.type, new Set());
    }
    if (product.subcategory) {
      productsByCategory.get(product.type).add(product.subcategory);
    }
  }

  const categories = [];
  for (const [type, subcategoriesUsed] of productsByCategory.entries()) {
    const meta = categoryMetadata[type] || {};
    const metaSubcategories = Array.isArray(meta.subcategories) ? meta.subcategories : [];
    const matchedSubcategories = metaSubcategories.filter((sub) => subcategoriesUsed.has(sub.id));

    categories.push({
      id: type,
      label: meta.label || formatCategoryId(type),
      copy: meta.copy || '',
      order: typeof meta.order === 'number' ? meta.order : Number.MAX_SAFE_INTEGER,
      subcategories: matchedSubcategories,
    });
  }

  categories.sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
  return categories;
}
