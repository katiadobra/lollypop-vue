<template>
  <section class="contact">
    <header class="page-header">
      <h1>Contact</h1>
      <p class="lead">Tell us what you need and we’ll get back within one business day.</p>
    </header>

    <n-card class="contact-card">
      <n-form @submit.prevent="handleSubmit">
        <div class="form-grid">
          <n-form-item label="Name">
            <n-input v-model:value="form.name" placeholder="Your name" required />
          </n-form-item>
          <n-form-item label="Email">
            <n-input v-model:value="form.email" placeholder="you@email.com" type="email" required />
          </n-form-item>
          <n-form-item label="Order type">
            <n-select
              v-model:value="form.topic"
              :options="topicOptions"
              placeholder="Select a topic"
            />
          </n-form-item>
          <n-form-item label="Preferred date">
            <n-input v-model:value="form.date" placeholder="e.g. 24 May" />
          </n-form-item>
        </div>

        <n-form-item label="Message">
          <n-input
            v-model:value="form.message"
            type="textarea"
            placeholder="Share portions, delivery address, and any flavors you like."
            :autosize="{ minRows: 4 }"
            required
          />
        </n-form-item>

        <div class="consent-row">
          <n-checkbox v-model:checked="form.agree">
            I agree to
            <a href="/pages/terms-conditions" title="TERMS &amp; CONDITIONS">Terms &amp; Conditions</a>
            and
            <a href="/pages/privacy-policy" title="Privacy Policy">Privacy Policy</a>
          </n-checkbox>
        </div>

        <div class="actions">
          <n-button type="primary" color="#ff69b4" round size="large" :disabled="!canSubmit" attr-type="submit">
            Send message
          </n-button>
        </div>
      </n-form>
    </n-card>
  </section>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { NButton, NCard, NCheckbox, NForm, NFormItem, NInput, NSelect } from 'naive-ui';

const form = reactive({
  name: '',
  email: '',
  topic: null,
  date: '',
  message: '',
  agree: false,
});

const topicOptions = [
  { label: 'Custom cake', value: 'custom-cake' },
  { label: 'Event order', value: 'event-order' },
  { label: 'Corporate / bulk', value: 'corporate' },
  { label: 'Other question', value: 'other' },
];

const canSubmit = computed(() => {
  return form.name && form.email && form.message && form.agree;
});

function handleSubmit() {
  if (!canSubmit.value) return;
  // Placeholder submit handler
  window.alert('Thanks! We received your message and will reply soon.');
  console.log('Form submitted:', { ...form });
  // Reset form
  form.name = '';
  form.email = '';
  form.topic = null;
  form.date = '';
  form.message = '';
  form.agree = false;
}
</script>

<style scoped>
.contact {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.lead {
  margin: 0;
  color: #4b5563;
}

.contact-card {
  padding: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px 16px;
}

.consent-row {
  margin: 12px 0;
}

.consent-row a {
  color: inherit;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

@media (min-width: 760px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
  
