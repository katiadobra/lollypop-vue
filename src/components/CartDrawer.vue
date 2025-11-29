<template>
  <n-drawer v-model:show="ui.cartDrawerOpen" placement="right" width="360">
    <n-drawer-content title="Your box" closable @close="ui.closeCartDrawer">
      <div v-if="items.length" class="drawer-body">
        <TransitionGroup name="line-fade" tag="div" class="lines">
          <div v-for="item in items" :key="item.key" class="line">
            <div class="line-main">
              <div class="line-title">{{ item.name }}</div>
              <div class="line-meta">
                <span v-if="item.boxSize">Size: {{ item.boxSize }} pcs</span>
                <span v-if="item.flavor">Flavor: {{ item.flavor }}</span>
              </div>
            </div>
            <div class="line-actions">
              <div class="qty-controls">
                <n-button quaternary circle size="tiny" @click="decrement(item)">-</n-button>
                <span class="qty-value">{{ item.quantity }}</span>
                <n-button quaternary circle size="tiny" @click="increment(item)">+</n-button>
              </div>
              <div class="line-total">{{ formatCurrency(item.lineTotal) }}</div>
              <n-button quaternary circle size="tiny" @click="remove(item)">✕</n-button>
            </div>
          </div>
        </TransitionGroup>

        <div class="summary">
          <span>Subtotal</span>
          <span class="strong">{{ formatCurrency(subtotal) }}</span>
        </div>

        <RouterLink to="/cart" class="link-button" @click="ui.closeCartDrawer()">
          <n-button color="#ff69b4" round block>Open cart</n-button>
        </RouterLink>
      </div>

      <div v-else class="empty">
        <p>Your cart is empty.</p>
        <RouterLink to="/products" class="link-button" @click="ui.closeCartDrawer()">
          <n-button round>Browse products</n-button>
        </RouterLink>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { computed } from 'vue';
import { useCartStore } from '../stores/cart';
import { useProductsStore } from '../stores/products';
import { useUiStore } from '../stores/ui';

const cartStore = useCartStore();
const productsStore = useProductsStore();
const ui = useUiStore();

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

const items = computed(() =>
  cartStore.items.map((item) => {
    const product = productsStore.getById(item.id);
    const variant = parseVariant(item.variantId);
    const unitPrice = item.unitPrice;
    const lineTotal = unitPrice * item.quantity;
    return {
      key: item.variantId ? `${item.id}::${item.variantId}` : item.id,
      id: item.id,
      variantId: item.variantId || null,
      name: product?.name || 'Unknown product',
      flavor: variant.flavor || null,
      boxSize: variant.boxSize || null,
      quantity: item.quantity,
      unitPrice,
      lineTotal,
    };
  }),
);

const subtotal = computed(() => cartStore.cartTotal);

function formatCurrency(amount) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount || 0);
}

function decrement(item) {
  const newQty = Math.max(1, item.quantity - 1);
  cartStore.setQuantity(item.id, item.variantId, newQty);
}

function increment(item) {
  cartStore.setQuantity(item.id, item.variantId, item.quantity + 1);
}

function remove(item) {
  cartStore.removeItem(item.id, item.variantId);
}
</script>

<style scoped>
.drawer-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.line {
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.lines {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.line-main {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.line-title {
  font-weight: 700;
}

.line-meta {
  font-size: 12px;
  color: #6b7280;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.line-total {
  font-weight: 700;
}

.line-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.qty-controls {
  display: flex;
  align-items: center;
  gap: 6px;
}

.qty-value {
  min-width: 20px;
  text-align: center;
  font-weight: 600;
}

.summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
}

.empty {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.link-button {
  text-decoration: none;
  color: inherit;
}

.line-fade-enter-active,
.line-fade-leave-active {
  transition: all 200ms ease;
}

.line-fade-enter-from,
.line-fade-leave-to {
  opacity: 0;
  transform: translateX(8px);
}
</style>
