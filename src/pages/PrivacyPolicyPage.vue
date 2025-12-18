<!-- src/pages/PrivacyPolicyPage.vue -->
<template>
  <section class="privacy">
    <header class="page-header">
      <h1>Privacy Policy</h1>
      <div class="header-subtext">
        <p>How we collect, use, and protect your data.</p>
      </div>
    </header>

    <div class="policy-block">
      <h2>What we collect</h2>
      <p>
        Contact details, order details, and delivery information you provide when placing an order
        or inquiry.
      </p>
    </div>

    <div class="policy-block">
      <h2>Why we use it</h2>
      <p>
        To process orders, communicate about your bakes, and improve our service. We do not sell
        your data.
      </p>
    </div>

    <div class="policy-block">
      <h2>How we store it</h2>
      <p>Data is stored securely and only accessible to staff who need it to fulfill your order.</p>
    </div>

    <div class="policy-block">
      <h2>Your rights</h2>
      <p>
        You can request access, correction, or deletion of your data at any time by contacting the
        bakery.
      </p>
    </div>
  </section>
</template>

<style scoped>
.privacy {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.policy-block {
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
}

.policy-block:last-of-type {
  border-bottom: none;
}

.policy-block h2 {
  margin: 0 0 6px 0;
  font-size: 18px;
}

.policy-block p {
  margin: 0;
  color: #374151;
}
</style>
