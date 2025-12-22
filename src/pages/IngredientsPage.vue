<template>
  <section class="ingredients content-inner">
    <header class="page-header">
      <h1>INGREDIENTS</h1>
      <div class="header-subtext">
        <p><strong>
          Here you can see exactly what goes into our cakes, cupcakes, creams, and fillings.
        </strong></p>
        <p>
          If you’re curious about any ingredient, feel free to reach out — transparency matters to us.
        </p>
      </div>
    </header>

    <n-card :bordered="false" class="ingredients-card">
      <n-collapse default-expanded-names="i1">
        <n-collapse-item
          v-for="item in sections"
          :key="item.name"
          :title="item.title"
          :name="item.name"
        >
          <p class="body">{{ item.copy }}</p>
        </n-collapse-item>
      </n-collapse>
    </n-card>
  </section>
</template>

<script setup>
import { NCard, NCollapse, NCollapseItem } from 'naive-ui';

const sections = [
  {
    name: 'allergens',
    title: 'Allergens & cross-contact',
    copy: 'We handle gluten, eggs, dairy, and tree nuts in the same kitchen. While we do our best to keep ingredients separate, trace amounts may remain and we cannot guarantee that any of our baked goods are allergen-free as we use shared equipment to store, prepare and serve all of our cakes & sweets.',
  },
  {
    name: 'i1',
    title: 'Flour & grains',
    copy: 'We use unbleached wheat flour from German mills; for gluten-light specials we blend with fine-milled oats. No improvers or conditioners.',
  },
  {
    name: 'i2',
    title: 'Dairy & eggs',
    copy: 'Butter from pasture-raised dairies, fresh cream, and free-range eggs. For vegan options we switch to plant-based fats and aquafaba meringue.',
  },
  {
    name: 'i3',
    title: 'Fruits & nuts',
    copy: 'Seasonal berries and stone fruit sourced locally when possible; pistachios, almonds, and hazelnuts are roasted in-house for better aroma.',
  },
  {
    name: 'i4',
    title: 'Chocolate & cocoa',
    copy: 'Dark, milk, and white couvertures with high cacao butter content; we avoid compound coatings and keep additives to a minimum.',
  },
  {
    name: 'i5',
    title: 'Colors & flavors',
    copy: 'All our colors are 100% natural—made from finely milled fruit and vegetable powders (Bright Foods). No artificial dyes or artificial flavors. Vanilla is from whole beans or pure extract. As with any ingredient, please check the allergens section if you have sensitivities.',
  },
];
</script>

<style scoped>
.ingredients {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ingredients-card {
  padding: 12px;
}

.body {
  margin: 0;
  color: #374151;
  line-height: 1.5;
}
</style>
