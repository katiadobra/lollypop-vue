// src/data/products.js
export const products = [
  // CAKES
  {
    id: 'cake-strawberry-blossom',
    type: 'cake',
    subcategory: 'vintage',
    name: 'Strawberry Blossom',
    shortDescription: 'Vanilla sponge, strawberry cream and fresh berries.',
    description:
      'Soft vanilla sponge layered with strawberry cream, topped with fresh berries and a light vanilla chantilly.',
    price: 42,
    servings: 8,
    flavors: ['Vanilla sponge', 'Strawberry cream', 'Fresh berries', 'Chantilly'],
    allergens: ['Gluten', 'Eggs', 'Dairy'],
    quantities: [1],
    mainImage: 'https://i.pinimg.com/736x/ed/b4/2a/edb42a1391ab0199b6bb4bb2e81bd760.jpg',
    gallery: [],
  },
  {
    id: 'cake-chocolate-dream',
    type: 'cake',
    subcategory: 'bento',
    name: 'Chocolate Dream',
    shortDescription: 'Rich chocolate sponge and dark ganache.',
    description:
      'Moist chocolate sponge with dark chocolate ganache and cocoa nibs for a deep, intense flavour.',
    price: 45,
    servings: 8,
    flavors: ['Chocolate sponge', 'Dark ganache', 'Cocoa nibs'],
    allergens: ['Gluten', 'Eggs', 'Dairy'],
    quantities: [1],
    mainImage: 'https://i.pinimg.com/1200x/5f/5a/84/5f5a849c66164eb6f5b700729aac8565.jpg',
    gallery: [],
  },

  // CINNAMON ROLLS
  {
    id: 'roll-classic',
    type: 'cinnamon-roll',
    name: 'Classic Roll',
    shortDescription: 'Soft roll with cinnamon sugar glaze.',
    description:
      'A fluffy roll filled with cinnamon sugar and topped with a light cream cheese glaze.',
    price: 4.2,
    servings: 1,
    flavors: ['Cinnamon sugar', 'Cream cheese glaze'],
    allergens: ['Gluten', 'Eggs', 'Dairy'],
    quantities: [1, 4, 6, 12],
    mainImage:
      'https://raw.githubusercontent.com/katiadobra/lollypop-vue/refs/heads/main/public/roll_blueberry.png',
    gallery: [
      'https://github.com/katiadobra/lollypop-vue/blob/main/public/roll_apple.png?raw=true',
      'https://github.com/katiadobra/lollypop-vue/blob/main/public/roll_pear.png?raw=true',
      'https://github.com/katiadobra/lollypop-vue/blob/main/public/roll_red.png?raw=true',
    ],
  },
  {
    id: 'roll-berry-swirl',
    type: 'cinnamon-roll',
    name: 'Berry Swirl',
    shortDescription: 'Cinnamon roll with berry swirl.',
    description: 'Classic cinnamon roll with a swirl of mixed berries and vanilla glaze.',
    price: 4.8,
    servings: 1,
    flavors: ['Cinnamon', 'Mixed berries', 'Vanilla glaze'],
    allergens: ['Gluten', 'Eggs', 'Dairy'],
    quantities: [1, 4, 6, 12],
    mainImage: 'https://github.com/katiadobra/lollypop-vue/blob/main/public/roll_red.png?raw=true',
    gallery: [],
  },

  // TARTS
  {
    id: 'tart-pistachio',
    type: 'tart',
    name: 'Pistachio Tart',
    shortDescription: 'Buttery base with pistachio cream.',
    description:
      'Crisp pâte sablée shell filled with silky pistachio cream and roasted pistachios.',
    price: 6.5,
    servings: 1,
    flavors: ['Pistachio cream', 'Roasted pistachios', 'Buttery sablée'],
    allergens: ['Gluten', 'Eggs', 'Dairy', 'Tree nuts'],
    quantities: [1, 4, 6],
    mainImage: 'https://i.pinimg.com/1200x/f4/70/42/f470422734c46823babfd548628f2de9.jpg',
    gallery: null,
  },
  {
    id: 'tart-lemon',
    type: 'tart',
    name: 'Lemon Glow',
    shortDescription: 'Tangy lemon curd and torched meringue.',
    description: 'Bright lemon curd on a buttery base, finished with soft torched meringue.',
    price: 6.2,
    servings: 1,
    flavors: ['Lemon curd', 'Buttery base', 'Torched meringue'],
    allergens: ['Gluten', 'Eggs', 'Dairy'],
    quantities: [1, 4, 6],
    mainImage: 'https://i.pinimg.com/1200x/86/3f/25/863f2555713b3e45bb2add9fc927067c.jpg',
    gallery: [],
  },
  // CUPCAKES
  {
    id: 'cupcake-strawberry-blossom',
    type: 'cupcakes',
    name: 'Strawberry Blossom Cupcake',
    shortDescription: 'Vanilla sponge, strawberry cream and fresh berries.',
    description:
      'Soft vanilla sponge layered with strawberry cream, topped with fresh berries and a light vanilla chantilly.',
    price: 3,
    servings: null,
    flavors: ['Vanilla sponge', 'Creamcheese', 'Fresh berries'],
    allergens: ['Gluten', 'Eggs', 'Dairy'],
    quantities: [4, 6, 12, 24],
    mainImage: 'https://i.pinimg.com/1200x/07/95/f7/0795f714d3839ca5e56ef39d7a977b42.jpg',
  },
  {
    id: 'cupcake-berry-box',
    type: 'cupcakes',
    name: 'Berry Box',
    shortDescription: 'Mixed berry cupcakes in gift-ready boxes.',
    description:
      'Fluffy vanilla cupcakes topped with berry buttercream and a fresh berry garnish, packed in assorted box sizes.',
    price: 3.5, // base single price; overridden when a box price exists
    servings: 1,
    flavors: ['Vanilla base', 'Berry buttercream', 'Fresh berry garnish'],
    allergens: ['Gluten', 'Eggs', 'Dairy'],
    quantities: [
      { quantity: 4, price: 12.5 },
      { quantity: 6, price: 17.5 },
      { quantity: 12, price: 33 },
    ],
    mainImage: 'https://i.pinimg.com/1200x/09/28/bd/0928bdd846b752632e2db9586dc3e4e6.jpg',
    gallery: null,
  },
];
