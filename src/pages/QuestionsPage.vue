<template>
  <section class="qa">
    <header class="qa-header">
      <h1>Q &amp; A</h1>
      <p class="lead">Quick answers about orders, delivery, and custom bakes.</p>
    </header>

    <n-card :bordered="false" class="qa-card">
      <n-collapse default-expanded-names="q1">
        <n-collapse-item v-for="item in faqs" :key="item.name" :title="item.question" :name="item.name">
          <p class="answer">{{ item.answer }}</p>
        </n-collapse-item>
      </n-collapse>
    </n-card>
  </section>
</template>

<script setup>
import { branding } from '../config/branding';
import { NCard, NCollapse, NCollapseItem } from 'naive-ui';

const faqs = [
  {
    name: 'q1',
    question: 'How far in advance should I place an order?',
    answer: 'For standard items, 48 hours is ideal. For custom decor or larger quantities, please allow 4–5 days so we can confirm ingredients and timing.',
  },
  {
    name: 'q2',
    question: 'Do you offer delivery?',
    answer: `Yes—${branding.deliveryArea}. We schedule a delivery window after checkout and confirm by email or phone.`,
  },
  {
    name: 'q3',
    question: 'Can I request dietary tweaks?',
    answer: 'We offer select vegan and gluten-light options. Share your needs at checkout and we will confirm what is possible for your chosen items.',
  },
  {
    name: 'q4',
    question: 'What if I need a specific serving count?',
    answer: 'Most items list servings; for cupcakes and cookies you can pick box sizes. If you need an exact count, add it in the notes and we will match the closest pack size.',
  },
  {
    name: 'q5',
    question: 'How do I store the bakes?',
    answer: 'Cakes and tarts are best chilled and brought to room temp 30 minutes before serving. Rolls and cookies can be kept in an airtight box at room temp for 1–2 days.',
  },
];
</script>

<style scoped>
.qa {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.qa-header h1 {
  margin: 0 0 4px;
}

.lead {
  margin: 0;
  color: #4b5563;
}

.qa-card {
  padding: 12px;
}

.answer {
  margin: 0;
  color: #374151;
  line-height: 1.5;
}
</style>
