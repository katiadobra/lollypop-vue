<template>
  <section class="flavors">
    <header class="flavors-header">
      <h1>FLAVOR PALETTE</h1>
      <p class="lead">
        Explore our core flavor notes for cakes, cupcakes, creams, and fillings.
      </p>
      <p class="lead">
        Looking for a custom combo? Tell us your dream flavor and we'll help pair it.
      </p>
    </header>

    <n-card :bordered="false" class="flavors-card">
      <div v-for="product in products" :key="product.product" class="product-block">
        <div class="product-name">
          <n-gradient-text gradient="linear-gradient(90deg, #ff6ca4 0%, #fd219b 100%)">
            {{ product.product.toUpperCase() }}
          </n-gradient-text>
        </div>
        <div v-for="flavor in product.flavors" :key="flavor.title" class="flavor-block">
          <div class="flavor-name">{{ flavor.title }}</div>
          <p class="body">{{ flavor.copy }}</p>
        </div>
      </div>
    </n-card>
  </section>
</template>

<script setup>
const products = [
  {
    product: 'cake',
    flavors: [
      {
        title: 'Vanilla & cream',
        copy: 'Madagascar vanilla bean bases, light mascarpone creams, and whipped chantilly for clean, aromatic profiles.',
      },
      {
        title: 'Chocolate & coffee',
        copy: 'Dark cocoa sponge, 70% ganache, cocoa nib crunch, and espresso-infused buttercreams for depth and balance.',
      },
      {
        title: 'Citrus & berry',
        copy: 'Lemon curd, raspberry compote, and whipped citrus chantilly for bright, tangy layers.',
      },
      {
        title: 'Nutty praline',
        copy: 'Roasted pistachio creams, almond praline, and caramelized crunch layers for texture and aroma.',
      },
      {
        title: 'Seasonal special',
        copy: 'Limited spins like spiced pumpkin or mulled cherry, rotating with the season.',
      },
    ],
  },
  {
    product: 'cupcake',
    flavors: [
      {
        title: 'Berry swirl',
        copy: 'Vanilla sponge with mixed berry buttercream and fresh berry garnish.',
      },
      {
        title: 'Chocolate ganache',
        copy: 'Cocoa sponge topped with dark chocolate ganache and cocoa nib crunch.',
      },
      {
        title: 'Lemon kiss',
        copy: 'Zesty lemon curd center with vanilla frosting and candied peel.',
      },
      {
        title: 'Pistachio rose',
        copy: 'Pistachio sponge with rose buttercream and toasted nuts.',
      },
    ],
  },
  {
    product: 'tart',
    flavors: [
      {
        title: 'Citrus curd',
        copy: 'Sharp lemon or yuzu curd on buttery sablée, finished with torched meringue.',
      },
      {
        title: 'Pistachio praline',
        copy: 'Roasted pistachio cream with caramelized nut shards for crunch.',
      },
      {
        title: 'Berry mascarpone',
        copy: 'Vanilla mascarpone with macerated berries and a light glaze.',
      },
    ],
  },
  {
    product: 'rolls & choux',
    flavors: [
      {
        title: 'Cinnamon classic',
        copy: 'Slow-proofed dough with cinnamon sugar and cream cheese glaze.',
      },
      {
        title: 'Coffee praline',
        copy: 'Coffee pastry cream with hazelnut praline crunch.',
      },
      {
        title: 'Vanilla bean',
        copy: 'Light vanilla custard with a dusting of powdered sugar.',
      },
    ],
  },
];
</script>

<style scoped>
.flavors {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.flavors-header h1 {
  margin: 0 0 4px;
}

.lead {
  margin: 0;
  color: #4b5563;
}

.flavors-card {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f3f4f6;
}

.product-block:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.product-name {
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 25px 0 10px 0;
}

.flavor-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.flavor-name {
  font-weight: 700;
}

.body {
  margin: 0 0 8px;
  color: #374151;
  line-height: 1.5;
}
</style>
