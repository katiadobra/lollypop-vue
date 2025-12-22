<template>
  <section class="care content-inner">
    <header class="page-header">
      <h1>CARE INSTRUCTIONS</h1>
      <div class="header-subtext">
        <p>How to store and serve your cakes, cupcakes, rolls, and tarts.</p>
      </div>
    </header>

    <n-card :bordered="false" class="care-card">
      <div v-for="item in sections" :key="item.name" class="care-block">
        <div class="product-name">
          <n-gradient-text gradient="linear-gradient(90deg, #fd219b 0%, #ff6ca4 100%)">
            {{ item.product.toUpperCase() }}
          </n-gradient-text>
        </div>
        <div v-for="detail in item.details" :key="detail.title" class="care-detail">
          <div class="detail-title">{{ detail.title }}</div>
          <p class="body">{{ detail.copy }}</p>
        </div>
      </div>
    </n-card>
  </section>
</template>

<script setup>
import { NCard, NGradientText } from 'naive-ui';

const sections = [
  {
    name: 'cake',
    product: 'cake',
    details: [
      {
        title: 'Storage',
        copy: 'Keep chilled (4°C). Remove from the fridge 30–40 minutes before serving so creams soften.',
      },
      {
        title: 'Transport',
        copy: 'Carry level and avoid direct sun. If traveling longer than 30 minutes, use a cool bag.',
      },
      {
        title: 'Shelf life',
        copy: 'Best within 24 hours. Fruit or cream-heavy cakes should be eaten same day.',
      },
    ],
  },
  {
    name: 'cupcake',
    product: 'cupcake',
    details: [
      {
        title: 'Storage',
        copy: 'Keep in an airtight box at room temp for up to 24 hours, or chilled for buttercream stability.',
      },
      {
        title: 'Serving',
        copy: 'Let chilled cupcakes sit 15 minutes before serving so the frosting softens.',
      },
      { title: 'Shelf life', copy: 'Best day-of. Frosted cupcakes are freshest within 24 hours.' },
    ],
  },
  {
    name: 'rolls',
    product: 'cinnamon rolls',
    details: [
      {
        title: 'Storage',
        copy: 'Keep at room temp in an airtight box. Avoid the fridge to prevent staling.',
      },
      {
        title: 'Reheat',
        copy: 'Warm at 150°C for 5–7 minutes to refresh softness. Enjoy right after reheating.',
      },
      { title: 'Shelf life', copy: 'Best within 1–2 days; fresher is softer.' },
    ],
  },
  {
    name: 'choux',
    product: 'choux',
    details: [
      { title: 'Storage', copy: 'Keep in the fridge at 4°C. Do not freeze.' },
      {
        title: 'Serving',
        copy: 'Bring to room temp 10–15 minutes before serving so the filling softens.',
      },
      { title: 'Shelf life', copy: 'Enjoy the same day you pick them up for best texture.' },
    ],
  },
  {
    name: 'tart',
    product: 'tart',
    details: [
      {
        title: 'Storage',
        copy: 'Keep chilled (4°C) to preserve curds and creams. Remove 15–20 minutes before serving.',
      },
      {
        title: 'Serving',
        copy: 'Slice with a hot, dry knife for clean edges. Avoid stacking boxes.',
      },
      {
        title: 'Shelf life',
        copy: 'Best within 24 hours; fruit or meringue toppings are same-day items.',
      },
    ],
  },
];
</script>

<style scoped>
.care {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.care-card {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.care-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 12px;
}

.care-block:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.product-name {
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 16px 0 6px 0;
}

.care-detail {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-title {
  font-weight: 700;
}

.body {
  margin: 0 0 6px;
  color: #374151;
  line-height: 1.5;
}
</style>
