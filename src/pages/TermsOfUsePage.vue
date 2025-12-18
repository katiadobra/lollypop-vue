<!-- src/pages/TermsConditionsPage.vue' -->
<template>
  <section class="terms">
    <header class="page-header">
      <h1>Terms Of Use</h1>
    </header>

    <div class="terms-block">
      <h2>Orders &amp; lead times</h2>
      <p>
        Most items are baked to order. Please allow at least 48 hours for standard cakes and 72
        hours for large or custom designs.
      </p>
    </div>

    <div class="terms-block">
      <h2>Payments</h2>
      <p>
        Invoices are issued once we confirm availability. Orders are confirmed after payment is
        received.
      </p>
    </div>

    <div class="terms-block">
      <h2>Changes &amp; cancellations</h2>
      <p>
        Edits are possible up to 48 hours before your scheduled pickup or delivery. After that,
        costs may have already been incurred.
      </p>
    </div>

    <div class="terms-block">
      <h2>Allergies</h2>
      <p>
        We operate in a kitchen that handles gluten, dairy, eggs, and nuts. We take care, but cannot
        guarantee absence of traces.
      </p>
    </div>
  </section>
</template>

<style scoped>
.terms {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.terms-block {
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
}

.terms-block:last-of-type {
  border-bottom: none;
}

.terms-block h2 {
  margin: 0 0 6px 0;
  font-size: 18px;
}

.terms-block p {
  margin: 0;
  color: #374151;
}
</style>
