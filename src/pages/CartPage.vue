<template>
  <section class="cart-page">
    <header class="page-header">
      <h1>Pre-order box</h1>
      <div class="header-subtext">
        <p>Review your items, pick delivery or pickup, and choose a slot.</p>
      </div>
    </header>

    <div v-if="cartItems.length" class="cart-content">
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.key" class="cart-card">
          <div class="row">
            <div class="thumb" :style="!item.image ? placeholderStyle(item.id) : undefined">
              <img v-if="item.image" :src="item.image" :alt="`${item.name} photo`" loading="lazy" />
              <span v-else class="thumb-initial">{{ item.name.charAt(0) }}</span>
            </div>
            <div class="info">
              <h3 class="item-title">
                <RouterLink :to="`/product/${item.id}`" class="item-link">{{
                  item.name
                }}</RouterLink>
              </h3>
              <p class="meta" v-if="item.boxSize || item.flavor">
                <span v-if="item.boxSize">Size: {{ item.boxSize }} pcs</span>
                <span v-if="item.flavor">Flavor: {{ item.flavor }}</span>
              </p>
            </div>

            <div class="price">
              <span class="label">Price</span>
              <span class="value">{{ formatCurrency(item.unitPrice) }}</span>
            </div>

            <div class="qty">
              <div class="label">Qty</div>
              <div class="qty-controls">
                <n-button quaternary circle size="small" @click="decrement(item)">-</n-button>
                <span class="qty-value">{{ item.quantity }}</span>
                <n-button quaternary circle size="small" @click="increment(item)">+</n-button>
              </div>
            </div>

            <div class="total">
              <span class="label">Total</span>
              <span class="value">{{ formatCurrency(item.lineTotal) }}</span>
            </div>

            <div class="remove">
              <button
                class="remove-icon"
                type="button"
                @click="removeItem(item)"
                aria-label="Remove item"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="summary">
        <div class="summary-card">
          <h3>Order summary</h3>
          <div class="summary-row">
            <span>Subtotal</span>
            <span class="value">{{ formatCurrency(subtotal) }}</span>
          </div>
          <n-divider />
          <div class="options">
            <h4>Method</h4>
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
              <n-date-picker
                v-model:value="selectedDate"
                type="date"
                clearable
                :is-date-disabled="isDateDisabled"
              />
              <n-select
                v-model:value="selectedTime"
                :options="timeOptions"
                placeholder="Select a slot"
                clearable
              />
            </div>
          </div>

          <div class="options">
            <h4>Contact details</h4>
            <div class="contact-grid">
              <n-input v-model:value="contactName" placeholder="Full name" />
              <n-input v-model:value="contactEmail" placeholder="Email" type="email" />
              <n-input v-model:value="contactPhone" placeholder="Phone" />
              <n-input
                v-model:value="contactNotes"
                type="textarea"
                placeholder="Notes (delivery, dietary, etc.)"
              />
            </div>
          </div>

          <div class="options">
            <n-checkbox v-model:checked="agreeTerms">
              I have read all
              <RouterLink to="/pages/terms-conditions" class="inline-link">
                Terms &amp; Conditions
              </RouterLink>
              and I agree.
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

          <n-button
            class="preorder-btn"
            color="#ff69b4"
            size="large"
            round
            block
            :loading="submitting"
            :disabled="!canSubmit"
            @click="submitPreorder"
          >
            Place pre-order (no payment yet)
          </n-button>
        </div>
      </div>
    </div>

    <div v-else class="empty">
      <n-card :bordered="false">
        <h3>Your cart is empty</h3>
        <p>Add cakes, rolls, or boxes and come back to pick your date.</p>
        <RouterLink to="/products" class="link-button">
          <n-button color="#ff69b4" round>Browse products</n-button>
        </RouterLink>
      </n-card>
    </div>

    <n-drawer
      v-model:show="preorderDrawerVisible"
      placement="bottom"
      :height="400"
      display-directive="if"
    >
      <n-drawer-content title="Complete your pre-order" closable>
        <p class="modal-text">
          Your email app should open with the pre-order draft. Please review and press "Send".
          If it did not open, copy the details below and email them to zucker.shop@gmail.com.
        </p>
        <div class="modal-actions">
          <n-button size="small" color="#ff69b4" @click="copyPreorderDetails">
            Copy details
          </n-button>
          <n-button size="small" class="pink-outline" @click="clearCartAndCloseModal">
            Clear cart
          </n-button>
          <n-button size="small" class="pink-outline" @click="closeModal">Close</n-button>
        </div>
        <pre class="email-preview">{{ latestEmailBody }}</pre>
      </n-drawer-content>
    </n-drawer>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue';
import { NAlert, NButton, NCheckbox, NDatePicker, NDivider, NInput, NDrawer, NDrawerContent, NSelect } from 'naive-ui';
import { useCartStore } from '../stores/cart';
import { useProductsStore } from '../stores/products';

const cartStore = useCartStore();
const productsStore = useProductsStore();

const fulfilmentOptions = [
  { value: 'pickup', label: 'Store pickup', icon: '🏬' },
  { value: 'delivery', label: 'Local delivery', icon: '🚚' },
];

const fulfilment = ref('pickup');
const selectedDate = ref(null);
const selectedTime = ref(null);
const agreeTerms = ref(false);
const submitting = ref(false);
const submitStatus = ref({ type: '', message: '' });
const preorderDrawerVisible = ref(false);
const lastPreorderPayload = ref(null);
const contactName = ref('');
const contactEmail = ref('');
const contactPhone = ref('');
const contactNotes = ref('');
const canSubmit = computed(() =>
  Boolean(agreeTerms.value && selectedDate.value && isContactValid.value),
);
const timeOptions = computed(() => buildTimeOptions(9, 18, 30));
const isContactValid = computed(() => {
  return !!(contactName.value.trim() && isEmailValid(contactEmail.value));
});

const CONTACT_STORAGE_KEY = 'preorder-contact';

onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem(CONTACT_STORAGE_KEY) || '{}');
    contactName.value = saved.name || '';
    contactEmail.value = saved.email || '';
    contactPhone.value = saved.phone || '';
    contactNotes.value = saved.notes || '';
    selectedDate.value = saved.date ?? null;
    selectedTime.value = saved.time ?? null;
  } catch (e) {
    // ignore
  }
});

watch(
  [contactName, contactEmail, contactPhone, contactNotes, selectedDate, selectedTime],
  ([name, email, phone, notes, date, time]) => {
    const payload = { name, email, phone, notes, date, time };
    localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(payload));
  },
);

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
  const index =
    Math.abs(id.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0)) % palette.length;
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
  if (!value) return null;
  // if already an ISO or string like "HH:mm", pass through
  if (typeof value === 'string') return value;
  return new Date(value).toISOString();
}

function formatDisplayDate(value) {
  if (!value) return 'n/a';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

function isEmailValid(value) {
  return /\S+@\S+\.\S+/.test(value);
}

function buildTimeOptions(startHour, endHour, stepMinutes) {
  const options = [];
  for (let h = startHour; h <= endHour; h += 1) {
    for (let m = 0; m < 60; m += stepMinutes) {
      // stop at 18:30 when endHour=18
      if (h === endHour && m > 30) break;
      const label = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      options.push({ label, value: label });
    }
  }
  return options;
}

function isDateDisabled(ts) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return ts < today.getTime();
}

function formatItemLine(item) {
  const name = item.name || item.id;
  const flavorLabel = item.flavor ? ` • ${item.flavor}` : '';
  const sizeLabel = item.boxSize
    ? `${item.boxSize} ${item.boxSize === 1 ? 'piece' : 'pcs'}`
    : null;
  const qtyLabel = sizeLabel ? `${item.quantity} x ${sizeLabel}` : `${item.quantity}`;

  const header = `- ${name}${flavorLabel} (qty: ${qtyLabel})`;
  const details = [`  Unit price: ${formatCurrency(item.unitPrice)}`];

  return `${header}\n${details.join('\n')}`;
}

function buildEmailBody(payload) {
  const lines = [];
  lines.push('Hello Zucker team,');
  lines.push('');
  lines.push('I would like to place this pre-order:');
  lines.push('');
  payload.items.forEach((item) => lines.push(formatItemLine(item)));
  lines.push('');
  lines.push(`- Method: ${payload.fulfilment || 'n/a'}`);
  lines.push(`- ${payload.fulfilment || ''} Date: ${formatDisplayDate(payload.date)}`);
  lines.push(`- ${payload.fulfilment || ''} Time: ${payload.time || 'n/a'}`);
  lines.push('');
  if (payload.contact) {
    lines.push('My contact details:');
    lines.push(`- Name: ${payload.contact.name || 'n/a'}`);
    lines.push(`- Email: ${payload.contact.email || 'n/a'}`);
    if (payload.contact.phone) {
      lines.push(`- Phone: ${payload.contact.phone}`);
    }
    if (payload.contact.notes) lines.push(`- Notes: ${payload.contact.notes}`);
    lines.push('');
  }
  lines.push('Thank you! I look forward to your confirmation.');
  return lines.join('\n');
}

const latestEmailBody = computed(() =>
  lastPreorderPayload.value ? buildEmailBody(lastPreorderPayload.value) : '',
);

function openMailClient(payload) {
  const subject = `Pre-order (${payload.fulfilment || 'n/a'}) - ${payload.items.length} item(s)`;
  const body = buildEmailBody(payload);
  const to = 'zucker.shop@gmail.com';
  const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
}

async function copyPreorderDetails() {
  if (!lastPreorderPayload.value) return;
  try {
    await navigator.clipboard.writeText(buildEmailBody(lastPreorderPayload.value));
    setStatus('success', 'Pre-order details copied. Paste into email if needed.');
  } catch (err) {
    console.error('Copy failed', err);
    setStatus('error', 'Could not copy. Please select and copy manually.');
  }
}

function clearCartAndCloseModal() {
  cartStore.clearCart();
  preorderDrawerVisible.value = false;
  setStatus('success', 'Cart cleared. You can start a new pre-order.');
}

function closeModal() {
  preorderDrawerVisible.value = false;
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
  setStatus('info', 'Opening your email client...');

  const payload = {
    items: cartItems.value,
    subtotal: subtotal.value,
    fulfilment: fulfilment.value,
    date: isoOrNull(selectedDate.value),
    time: isoOrNull(selectedTime.value),
    contact: {
      name: contactName.value.trim(),
      email: contactEmail.value.trim(),
      phone: contactPhone.value.trim(),
      notes: contactNotes.value.trim(),
    },
  };

  try {
    lastPreorderPayload.value = payload;
    openMailClient(payload);
    preorderDrawerVisible.value = true;
    setStatus(
      'success',
      'Email draft opened. Please hit send in your mail app to complete the pre-order.',
    );
  } catch (err) {
    console.error('Pre-order send failed', err);
    setStatus('error', 'Could not open your mail app. Please email us directly.');
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

.cart-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-page :deep(.n-card) {
  border-radius: 0;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cart-card {
  padding: 10px 10px;
  background: #fafafa;
  border-radius: 0;
}

/* helper: hide mobile-only elements by default; enabled inside mobile media query */
.mobile-only {
  display: none;
}

.row {
  display: grid;
  grid-template-columns: 56px 1fr 40px;
  grid-template-areas:
    'thumb info remove'
    'thumb price remove'
    'thumb qty remove'
    'thumb total remove';
  gap: 8px;
  align-items: start;
}

.price,
.qty,
.total {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
}

.remove {
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: end;
}

@media (max-width: 719px) {
  /* ensure price value is visible */
  .price .value {
    display: block !important;
    color: #111827 !important;
    font-weight: 800 !important;
  }

  /* hide labels for price/qty on mobile to reduce clutter */
  .price .label,
  .qty .label {
    display: none;
  }

  /* hide total block entirely on mobile */
  .total {
    display: none;
  }
}

.thumb {
  width: 56px;
  height: 56px;
  border-radius: 0;
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
  font-size: 28px;
  font-weight: 700;
  color: #111827;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-title {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 16px;
  font-weight: 800;
  line-height: 1.2;
}

.item-link {
  color: inherit;
  text-decoration: none;
}

.item-link:hover {
  text-decoration: underline;
}

.meta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 0;
  color: #4b5563;
}

.price-line {
  font-size: 16px;
  font-weight: 800;
}

.mobile-qty {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.qty-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.qty-label {
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #6b7280;
}

.qty-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.qty-controls.boxy {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 4px 6px;
  width: 120px;
  justify-content: space-between;
}

.qty-value {
  min-width: 24px;
  text-align: center;
  font-weight: 600;
}

.line-total {
  font-weight: 700;
  color: #374151;
  font-size: 14px;
}

/* remove per-item line total on mobile to reduce vertical clutter */
.mobile-qty .line-total {
  display: none;
}

.remove-text {
  background: none;
  border: none;
  padding: 0;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #111827;
  cursor: pointer;
  align-self: flex-start;
}

/* hide the small "Quantity" label on mobile to reduce vertical clutter */
.qty-label {
  display: none;
}

/* hide the old mobile remove text and use the icon placed in its own column */
.mobile-qty .remove-text {
  display: none;
}

.remove-icon {
  background: none;
  border: none;
  padding: 6px;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  color: #111827;
  border-radius: 6px;
}

/* grid area assignments */
.thumb {
  grid-area: thumb;
}
.info {
  grid-area: info;
}
.price {
  grid-area: price;
}
.qty {
  grid-area: qty;
}
.total {
  grid-area: total;
}
.remove {
  grid-area: remove;
}

.desktop-only {
  display: none;
}

/* desktop/tablet labels */
.label {
  font-size: 12px;
  color: #6b7280;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  display: block;
}

.value {
  font-weight: 700;
}

@media (min-width: 900px) {
  .row {
    grid-template-columns:
      96px
      minmax(0, 1fr)
      120px
      120px
      120px
      40px;
    grid-template-areas: 'thumb info price qty total remove';
    gap: 18px;
    align-items: center;
  }

  .thumb {
    width: 96px;
    height: 96px;
  }

  .info {
    gap: 10px;
  }

  .item-title {
    font-size: 22px;
  }

  .price-line {
    font-size: 24px;
  }

  .mobile-qty {
    display: none;
  }

  /* on desktop keep labels above values in their columns */
  .price,
  .qty,
  .total {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    text-align: center;
  }

  .label {
    display: block;
  }

  .desktop-only {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .qty-controls {
    justify-content: flex-start;
  }

  .remove-text {
    align-self: center;
    justify-self: end;
  }
}

@media (min-width: 720px) and (max-width: 899px) {
  .row {
    grid-template-columns:
      80px
      minmax(0, 1fr)
      120px
      120px
      120px
      40px;
    grid-template-areas: 'thumb info price qty total remove';
    gap: 14px;
    align-items: center;
    padding-bottom: 12px;
  }

  .thumb {
    width: 80px;
    height: 80px;
  }

  .item-title {
    font-size: 20px;
  }

  .price-line {
    font-size: 22px;
  }

  .mobile-qty {
    display: none;
  }

  .price,
  .qty,
  .total {
    align-items: center;
    flex-direction: column;
    gap: 6px;
    text-align: center;
  }

  .desktop-only {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
}

.summary {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: stretch;
}

.summary-card {
  padding: 12px;
  width: 100%;
  max-width: 500px;
  align-self: flex-end;
  margin-left: auto;
  background: #fff;
}

.summary-card h3 {
  margin: 0 0 8px;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

.contact-grid :deep(textarea) {
  min-height: 80px;
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

.options {
  margin: 10px 0;
}

.options h4 {
  margin: 0 0 6px;
}

.preorder-btn {
  margin: 15px 0;
}

.empty {
  max-width: 600px;
}

.link-button {
  text-decoration: none;
  color: inherit;
}

.inline-link {
  color: inherit;
  text-decoration: underline;
  text-decoration-thickness: 1px;
}

.modal-text {
  margin: 0 0 12px;
}

.modal-actions {
  display: flex;
  gap: 8px;
  margin: 0 0 12px;
  flex-wrap: wrap;
}

.modal-actions :deep(.n-button) {
  min-width: 120px;
}

.pink-outline {
  border: 1px solid #ff69b4 !important;
  color: #ff69b4 !important;
  background: transparent !important;
}

.email-preview {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px;
  white-space: pre-wrap;
  max-height: 240px;
  overflow: auto;
  font-size: 12px;
}

@media (min-width: 960px) {
}
</style>

<style>
/* Global overrides for Naive date picker panel (teleports to body) */
.n-date-panel-date--excluded:not(.n-date-panel-date--disabled) {
  color: #ff69b4 !important;
}
</style>
