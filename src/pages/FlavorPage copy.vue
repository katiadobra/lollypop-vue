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
      <n-collapse default-expanded-names="f1">
        <n-collapse-item v-for="item in sections" :key="item.name" :title="item.title" :name="item.name">
          <p class="body">{{ item.copy }}</p>
        </n-collapse-item>
      </n-collapse>
    </n-card>
  </section>
</template>

<script setup>
const sections = [
  {
    name: 'f1',
    title: 'Vanilla & cream',
    copy: 'Madagascar vanilla bean bases, light mascarpone creams, and whipped chantilly for clean, aromatic profiles.',
  },
  {
    name: 'f2',
    title: 'Chocolate & coffee',
    copy: 'Dark cocoa sponge, 70% ganache, cocoa nib crunch, and espresso-infused buttercreams for depth and balance.',
  },
  {
    name: 'f3',
    title: 'Fruits & berries',
    copy: 'Lemon curd, berry compotes, passionfruit curd, and roasted stone-fruit jams to brighten cakes and tarts.',
  },
  {
    name: 'f4',
    title: 'Nutty & praline',
    copy: 'Roasted pistachio creams, almond praline, hazelnut gianduja, and caramelized crunch layers.',
  },
  {
    name: 'f5',
    title: 'Seasonal specials',
    copy: 'Limited flavors like spiced pumpkin, mulled cherry, or rhubarb-rose, rotating with the season.',
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
}

.body {
  margin: 0;
  color: #374151;
  line-height: 1.5;
}
</style>
