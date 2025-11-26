<!-- src/pages/ProductDetailPage.vue -->
<template>
  <section class="product-detail">
    <n-card v-if="product" class="detail-card" :bordered="false">

      <RouterLink to="/products" class="back-link" style="display:inline-block; margin-bottom:20px;">← Back to products</RouterLink>

      <div class="detail-body">
        <div class="visual-block">
          <div
            class="detail-visual"
            :style="!product.mainImage ? placeholderStyle(product.id) : undefined"
            :class="{ 'with-image': !!product.mainImage }"
          >
            <img
              v-if="product.mainImage"
              :src="product.mainImage"
              :alt="`${product.name} photo`"
              loading="lazy"
            />
            <span v-else class="visual-initial">{{ product.name.charAt(0) }}</span>
          </div>

          <div v-if="galleryImages.length" class="gallery">
            <div
              v-for="image in galleryImages"
              :key="image"
              class="gallery-item"
              :style="!product.mainImage ? placeholderStyle(product.id) : undefined"
            >
              <img :src="image" :alt="`${product.name} gallery photo`" loading="lazy" />
            </div>
          </div>
        </div>

        <!-- col 2 -->
        <div class="purchase">
          <div class="detail-header">
            <h1 class="title">{{ product.name }}</h1>
            <p class="lead">{{ product.description }}</p>
            <div class="pill-row">
              <n-tag size="small" round type="info">{{ formatType(product.type) }}</n-tag>
              <n-tag
                v-if="product.servings"
                size="small"
                round
                :color="{ color: accentColor, textColor: '#ffffff' }"
              >
                {{ product.servings }} servings
              </n-tag>
            </div>
          </div>
          <div class="price-block">
            <div class="price-label">Price</div>
            <div class="price-value">{{ formattedPrice }}</div>
            <div class="price-note">Incl. VAT, ex delivery</div>
          </div>

          <div v-if="flavorOptions.length" class="select-group">
            <label class="select-label" :for="`flavor-select-${product.id}`">Flavor</label>
            <n-select
              :id="`flavor-select-${product.id}`"
              v-model:value="selectedFlavor"
              :options="flavorOptions"
              placeholder="Choose a flavor"
            />
          </div>

          <div v-if="boxQuantityOptions.length" class="select-group">
            <label class="select-label" :for="`box-quantity-select-${product.id}`">Available quantities</label>
            <n-select
              :id="`box-quantity-select-${product.id}`"
              v-model:value="selectedBoxQuantity"
              :options="boxQuantityOptions"
              placeholder="Choose a box size"
            />
          </div>

          <div class="quantity">
            <span class="quantity-label">Quantity</span>
            <div class="quantity-controls">
              <n-button quaternary circle size="small" @click="decrement">-</n-button>
              <span class="quantity-value">{{ quantity }}</span>
              <n-button quaternary circle size="small" @click="increment">+</n-button>
            </div>
          </div>

          <div class="cta">
            <div class="total">
              <span class="total-label">Total</span>
              <span class="total-value">{{ formattedTotal }}</span>
            </div>
            <n-button color="#ff69b4" round size="large" block @click="addCurrentToCart">
              Add to cart
            </n-button>
          </div>

          <h2 style="text-transform: uppercase; letter-spacing: 0.12em; font-weight: 300; margin: 0 0 8px;">
            additional information
          </h2>

          <div class="info-panels">
            <div v-if="allergens.length" class="info-panel">
              <h3>Allergens</h3>
              <div class="tag-row">
                <n-tag
                  v-for="item in allergens"
                  :key="item"
                  size="small"
                  round
                  type="warning"
                >
                  {{ item }}
                </n-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </n-card>

    <n-card v-else class="not-found" :bordered="false">
      <h2>Product not found</h2>
      <p class="lead">Looks like this item left the oven. Choose another bake from the menu.</p>
      <RouterLink to="/products" class="link-button">
        <n-button round>Back to products</n-button>
      </RouterLink>
    </n-card>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useProductsStore } from '../stores/products';
import { useCartStore } from '../stores/cart';

const route = useRoute();
const productsStore = useProductsStore();
const cartStore = useCartStore();

const accentColor = '#ff69b4';
const placeholderPalette = ['#ffe5ef', '#e0f2fe', '#ecfdf3', '#fff7ed', '#ede9fe', '#fdf2f8'];

const product = computed(() => productsStore.getById(route.params.id));
const quantity = ref(1);

const infoEntries = computed(() => {
  if (!product.value) return [];
  const entries = [];
  if (product.value.servings) entries.push({ label: 'Servings', value: `${product.value.servings} people` });
  if (product.value.weight) entries.push({ label: 'Weight', value: `${product.value.weight} g` });
  if (product.value.ingredients) entries.push({ label: 'Ingredients', value: product.value.ingredients });
  return entries;
});

const galleryImages = computed(() => (product.value?.gallery ? product.value.gallery : []));
const flavors = computed(() => product.value?.flavors || []);
const allergens = computed(() => product.value?.allergens || []);
const quantities = computed(() => product.value?.quantities || []);
const flavorOptions = computed(() => flavors.value.map((flavor) => ({ label: flavor, value: flavor })));
const selectedFlavor = ref('');
const needsBoxQuantitySelect = computed(() => {
  const type = (product.value?.type || '').toLowerCase();
  return type.includes('cupcake') || type.includes('cookie');
});

const parsedQuantities = computed(() => {
  if (!needsBoxQuantitySelect.value) return [];
  return quantities.value
    .map((entry) => {
      if (typeof entry === 'number') return { quantity: entry };
      if (entry && typeof entry === 'object' && entry.quantity) return { quantity: entry.quantity };
      return null;
    })
    .filter(Boolean);
});

const boxQuantityOptions = computed(() =>
  parsedQuantities.value.map((item) => ({
    label: `${item.quantity} pcs`,
    value: item.quantity,
  })),
);

const selectedBoxQuantity = ref(null);

const boxSize = computed(() => {
  if (!needsBoxQuantitySelect.value) return 1;
  if (selectedBoxQuantity.value) return selectedBoxQuantity.value;
  if (parsedQuantities.value.length) return parsedQuantities.value[0].quantity;
  return 1;
});

const formattedPrice = computed(() => {
  if (!product.value) return '';
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(product.value.price);
});

const formattedTotal = computed(() => {
  if (!product.value) return '';
  const total = product.value.price * quantity.value;
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(total);
});

watch(
  flavors,
  (newFlavors) => {
    selectedFlavor.value = newFlavors.length ? newFlavors[0] : '';
  },
  { immediate: true }
);

watch(
  parsedQuantities,
  (newOptions) => {
    selectedBoxQuantity.value = newOptions.length ? newOptions[0].quantity : null;
  },
  { immediate: true }
);

function formatType(type) {
  return type
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function placeholderStyle(id) {
  const index = Math.abs(id.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0)) % placeholderPalette.length;
  return { background: placeholderPalette[index] };
}

function decrement() {
  quantity.value = Math.max(1, quantity.value - 1);
}

function increment() {
  quantity.value += 1;
}

function addCurrentToCart() {
  if (!product.value) return;
  const variantParts = [];
  if (flavorOptions.value.length) variantParts.push(`flavor:${selectedFlavor.value}`);
  if (boxQuantityOptions.value.length && selectedBoxQuantity.value) variantParts.push(`box:${selectedBoxQuantity.value}`);
  const variantId = variantParts.length ? variantParts.join('|') : null;
  cartStore.addItem(product.value.id, product.value.price, {
    quantity: quantity.value,
    variantId,
  });
}
</script>

<style scoped>
.product-detail {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-card {
  padding: 20px;
}

.detail-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.pill-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.title {
  margin: 0;
  font-size: 32px;
}

.lead {
  margin: 0;
  color: #4b5563;
}

.detail-body {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.visual-block {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-visual {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #f3f4f6;
}

.detail-visual.with-image {
  padding: 0;
}

.detail-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.visual-initial {
  font-size: 64px;
  font-weight: 800;
  color: #111827;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
}

.gallery-item {
  border-radius: 12px;
  overflow: hidden;
  background: #f8fafc;
  aspect-ratio: 4 / 3;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.specs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.spec {
  background: #f8fafc;
  border-radius: 8px;
  padding: 12px;
}

.spec-label {
  display: block;
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.spec-value {
  font-weight: 600;
}

.info-panels {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.info-panel {
  background: #f9fafb;
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-panel h3 {
  margin: 0;
  font-size: 16px;
}

.info-list {
  margin: 0;
  padding-left: 16px;
  color: #374151;
}

.info-list li {
  margin-bottom: 4px;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.purchase {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  align-items: start;
}

.price-block {
  background: #fff5f9;
  border: 1px solid #ffd4e8;
  border-radius: 12px;
  padding: 12px 14px;
}

.price-label {
  font-size: 12px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.price-value {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.1;
}

.price-note {
  font-size: 12px;
  color: #6b7280;
}

.select-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.select-label {
  font-weight: 600;
}

.quantity {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.quantity-label {
  font-weight: 600;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity-value {
  min-width: 28px;
  text-align: center;
  font-weight: 600;
}

.cta {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.total {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.total-label {
  color: #6b7280;
  font-size: 14px;
}

.total-value {
  font-size: 22px;
  font-weight: 700;
}

.back-link {
  color: inherit;
  text-decoration: none;
  font-weight: 600;
}

.not-found {
  text-align: center;
}

@media (min-width: 900px) {
  .detail-body {
    grid-template-columns: 1.2fr 0.8fr;
  }

  .info-panels {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
}
</style>
