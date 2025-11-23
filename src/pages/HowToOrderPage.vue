<template>
  <section class="how-to">
    <header class="page-header">
      <p class="eyebrow">Ordering guide</p>
      <h1>How to order</h1>
      <p class="lead">
        Choose your favorites, tell us when and where to deliver, and we’ll bake to schedule.
      </p>
    </header>

    <n-grid cols="1 900:3" x-gap="16" y-gap="16" class="steps-grid">
      <n-grid-item v-for="step in steps" :key="step.title">
        <n-card size="medium" class="step-card" hoverable>
          <div class="step-number">{{ step.step }}</div>
          <h2 class="step-title">{{ step.title }}</h2>
          <p class="step-copy">{{ step.copy }}</p>
          <p class="step-meta">{{ step.meta }}</p>
        </n-card>
      </n-grid-item>
    </n-grid>

    <n-card class="cta-card" :bordered="false">
      <div class="cta-content">
        <div>
          <p class="eyebrow">Need a hand?</p>
          <h2>Custom requests & events</h2>
          <p class="lead">
            Tell us about your date, portions, and preferences. We’ll reply within one business day
            with a proposal and timeline.
          </p>
        </div>
        <n-space size="small">
          <RouterLink to="/contact" class="link-button">
            <n-button color="#ff69b4" size="large" round>Talk to the bakery</n-button>
          </RouterLink>
          <RouterLink to="/products" class="link-button">
            <n-button size="large" tertiary round>Browse products</n-button>
          </RouterLink>
        </n-space>
      </div>
    </n-card>
  </section>
</template>

<script setup>
const steps = [
  {
    step: '01',
    title: 'Pick your items',
    copy: 'Add cakes, rolls, and tarts to your cart. Servings are listed on each product.',
    meta: 'Most items are bake-to-order; stock is planned once you confirm.',
  },
  {
    step: '02',
    title: 'Set delivery or pickup',
    copy: 'Choose your date and share any venue or timing notes in the cart.',
    meta: 'We deliver across Berlin + Potsdam; pickups are welcome from the kitchen.',
  },
  {
    step: '03',
    title: 'Confirm & pay',
    copy: 'We’ll review the order, confirm availability, and send a payment link.',
    meta: 'Invoices include VAT. Edits are possible up to 48h before your date.',
  },
];
</script>

<style scoped>
.how-to {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  text-align: center;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 12px;
  color: #6b7280;
  margin: 0;
}

.lead {
  margin: 0;
  color: #4b5563;
  max-width: 640px;
}

.steps-grid {
  width: 100%;
}

.step-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.step-number {
  font-weight: 700;
  color: #9ca3af;
  letter-spacing: 0.06em;
}

.step-title {
  margin: 0;
  font-size: 18px;
}

.step-copy {
  margin: 0;
  color: #374151;
}

.step-meta {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}

.cta-card {
  background: #f9fafb;
}

.cta-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.link-button {
  text-decoration: none;
}
</style>
