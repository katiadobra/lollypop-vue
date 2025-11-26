<template>
  <section class="cart-page">
    <header class="page-header">
      <h1>Pre-order box</h1>
      <p class="lead">Review your items, pick delivery or pickup, and choose a slot.</p>
    </header>

    <div v-if="cartItems.length" class="cart-content">
      <div class="cart-items">
        <n-card v-for="item in cartItems" :key="item.key" :bordered="false" class="cart-card">
          <div class="row">
            <div class="thumb" :style="!item.image ? placeholderStyle(item.id) : undefined">
              <img v-if="item.image" :src="item.image" :alt="`${item.name} photo`" loading="lazy" />
              <span v-else class="thumb-initial">{{ item.name.charAt(0) }}</span>
            </div>
            <div class="col name">
              <div class="title-row">
                <h3 class="item-title">{{ item.name }}</h3>
              </div>
              <p class="meta">
                <span v-if="item.boxSize">Size: {{ item.boxSize }} pcs</span>
                <span v-if="item.flavor">Flavor: {{ item.flavor }}</span>
              </p>
            </div>
            <div class="col price">
              <span class="label">Price (1)</span>
              <span class="value">{{ formatCurrency(item.unitPrice) }}</span>
            </div>
            <div class="col qty">
              <span class="label">Qty</span>
              <div class="qty-controls">
                <n-button quaternary circle size="small" @click="decrement(item)">-</n-button>
                <span class="qty-value">{{ item.quantity }}</span>
                <n-button quaternary circle size="small" @click="increment(item)">+</n-button>
              </div>
            </div>
            <div class="col total">
              <span class="label">Line total</span>
              <span class="value">{{ formatCurrency(item.lineTotal) }}</span>
            </div>
            <div class="col remove">
              <n-button quaternary circle size="tiny" @click="removeItem(item)">✕</n-button>
            </div>
          </div>
        </n-card>
      </div>

      <div class="sidebar">
        <n-card :bordered="false" class="summary-card">
          <h3>Order summary</h3>
          <div class="summary-row">
            <span>Subtotal</span>
            <span class="value">{{ formatCurrency(subtotal) }}</span>
          </div>
          <n-divider />
          <div class="options">
            <h4>Fulfilment</h4>
            <div class="fulfilment">
              <n-button
                v-for="option in fulfilmentOptions"
                :key="option.value"
                :type="fulfilment === option.value ? 'primary' : 'tertiary'"
                :color="fulfilment === option.value ? '#ff69b4' : undefined"
                secondary
                round
                size="small"
                @click="fulfilment = option.value"
              >
                <span class="option-icon">{{ option.icon }}</span> {{ option.label }}
              </n-button>
            </div>
          </div>

          <div class="options">
            <h4>Date &amp; time</h4>
            <div class="datetime">
              <n-date-picker v-model:value="selectedDate" type="date" clearable />
              <n-time-picker v-model:value="selectedTime" format="HH:mm" clearable />
            </div>
          </div>

          <div class="options">
            <n-checkbox v-model:checked="agreeTerms">
              I have read all Terms &amp; Conditions and I agree.
            </n-checkbox>
          </div>

          <n-alert
            v-if="submitStatus.message"
            :type="submitStatus.type || 'info'"
            :show-icon="true"
            class="status"
          >
            {{ submitStatus.message }}
          </n-alert>

          <n-button color="#ff69b4" size="large" round block :loading="submitting" @click="submitPreorder">
            Place pre-order (no payment yet)
          </n-button>
        </n-card>
      </div>
    </div>

    <div v-else class="empty">
      <n-card :bordered="false">
        <h3>Your cart is empty</h3>
        <p class="lead">Add cakes, rolls, or boxes and come back to pick your date.</p>
        <RouterLink to="/products" class="link-button">
          <n-button color="#ff69b4" round>Browse products</n-button>
        </RouterLink>
      </n-card>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useCartStore } from '../stores/cart';
import { useProductsStore } from '../stores/products';

const cartStore = useCartStore();
const productsStore = useProductsStore();

const fulfilmentOptions = [
  { value: 'pickup', label: 'Store pickup', icon: '🏬' },
  { value: 'delivery', label: 'Local delivery', icon: '🚚' },
];

const fulfilment = ref('delivery');
const selectedDate = ref(null);
const selectedTime = ref(null);
const agreeTerms = ref(false);
const submitting = ref(false);
const submitStatus = ref({ type: '', message: '' });

function formatCurrency(amount) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount || 0);
}

function parseVariant(variantId) {
  if (!variantId) return {};
  const parts = variantId.split('|');
  const result = {};
  parts.forEach((part) => {
    const [key, value] = part.split(':');
    if (key === 'flavor') result.flavor = value;
    if (key === 'box') result.boxSize = Number(value);
  });
  return result;
}

const cartItems = computed(() =>
  cartStore.items.map((item) => {
    const product = productsStore.getById(item.id);
    const variant = parseVariant(item.variantId);
    const unitPrice = item.unitPrice;
    const lineTotal = unitPrice * item.quantity;
    return {
      key: item.variantId ? `${item.id}::${item.variantId}` : item.id,
      id: item.id,
      name: product?.name || 'Unknown product',
      image: product?.mainImage || null,
      flavor: variant.flavor || null,
      boxSize: variant.boxSize || null,
      quantity: item.quantity,
      unitPrice,
      lineTotal,
      variantId: item.variantId || null,
    };
  }),
);

const subtotal = computed(() => cartStore.cartTotal);

function placeholderStyle(id) {
  const palette = ['#ffe5ef', '#e0f2fe', '#ecfdf3', '#fff7ed', '#ede9fe', '#fdf2f8'];
  const index = Math.abs(id.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0)) % palette.length;
  return { background: palette[index] };
}

function decrement(item) {
  const newQty = Math.max(1, item.quantity - 1);
  cartStore.setQuantity(item.id, item.variantId, newQty);
}

function increment(item) {
  cartStore.setQuantity(item.id, item.variantId, item.quantity + 1);
}

function removeItem(item) {
  cartStore.removeItem(item.id, item.variantId);
}

function setStatus(type, message) {
  submitStatus.value = { type, message };
}

function isoOrNull(value) {
  return value ? new Date(value).toISOString() : null;
}

async function submitPreorder() {
  if (!cartItems.value.length) {
    setStatus('warning', 'Add at least one item.');
    return;
  }
  if (!agreeTerms.value) {
    setStatus('warning', 'Please agree to the Terms & Conditions.');
    return;
  }

  submitting.value = true;
  setStatus('', '');

  const payload = {
    items: cartItems.value,
    subtotal: subtotal.value,
    fulfilment: fulfilment.value,
    date: isoOrNull(selectedDate.value),
    time: isoOrNull(selectedTime.value),
    contact: null, // extend with form fields if you collect customer info
  };

  try {
    const res = await fetch('/.netlify/functions/send-preorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(await res.text());
    setStatus('success', 'Pre-order sent! We will confirm shortly.');
  } catch (err) {
    setStatus('error', 'Could not send pre-order. Please try again.');
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.cart-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.page-header h1 {
  margin: 0 0 6px;
}

.lead {
  margin: 0;
  color: #4b5563;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cart-card {
  padding: 12px;
}

.row {
  display: grid;
  grid-template-columns: 72px 1.4fr 0.8fr 0.8fr 0.8fr auto;
  gap: 12px;
  align-items: center;
}

.thumb {
  width: 72px;
  height: 72px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb-initial {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.name {
  gap: 6px;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-title {
  margin: 0;
}

.meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin: 0;
  color: #4b5563;
}

.label {
  font-size: 12px;
  color: #6b7280;
}

.value {
  font-weight: 700;
}

.qty {
  align-items: flex-start;
}

.qty-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.qty-value {
  min-width: 24px;
  text-align: center;
  font-weight: 600;
}

@media (max-width: 800px) {
  .row {
    grid-template-columns: 64px 1fr auto;
    grid-template-rows: repeat(3, auto);
    grid-template-areas:
      "thumb name remove"
      "thumb details details"
      "thumb totals totals";
  }

  .thumb {
    grid-area: thumb;
    width: 64px;
    height: 64px;
  }

  .name {
    grid-area: name;
  }

  .price,
  .qty,
  .total {
    grid-area: totals;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
    align-items: center;
  }

  .remove {
    grid-area: remove;
    display: flex;
    justify-content: flex-end;
  }

  .qty-controls {
    justify-content: center;
  }
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summary-card {
  padding: 12px;
}

.summary-card h3 {
  margin: 0 0 8px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
}

.fulfilment {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.option-icon {
  margin-right: 4px;
}

.datetime {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.options h4 {
  margin: 0 0 6px;
}

.empty {
  max-width: 600px;
}

.link-button {
  text-decoration: none;
  color: inherit;
}

@media (min-width: 960px) {
  .cart-content {
    grid-template-columns: 2fr 1fr;
  }
}
</style>
