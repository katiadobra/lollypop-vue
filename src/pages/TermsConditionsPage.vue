<template>
  <section class="terms">
    <h1>Conditions</h1>
    <p class="lead">Key conditions for working with our bakery.</p>

    <div class="terms-block">
      <h2>Lead times</h2>
      <p>Most orders need 48–72 hours. Larger events or custom designs may require additional notice.</p>
    </div>

    <div class="terms-block">
      <h2>Payment</h2>
      <p>Orders are confirmed after payment. Invoices include VAT and are sent once we confirm availability.</p>
    </div>

    <div class="terms-block">
      <h2>Changes</h2>
      <p>Edits can be made up to 48 hours before delivery or pickup. Later changes may not be possible.</p>
    </div>

    <div class="terms-block">
      <h2>Allergies</h2>
      <p>We handle gluten, dairy, eggs, and nuts. Cross-contact is possible despite careful prep.</p>
    </div>
  </section>
</template>

<style scoped>
.terms {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.lead {
  margin: 0;
  color: #4b5563;
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
