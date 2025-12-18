<template>
  <section class="terms">
    <header class="page-header">
      <h1>Terms &amp; Conditions</h1>
      <div class="header-subtext">
        <p>Payment, Changes, Cancellations, and Delivery Policies</p>
      </div>
    </header>

    <div class="terms-block">
      <h2>Lead times</h2>
      <p>
        Most orders need 48-72 hours. Larger events or custom designs may require additional notice.
      </p>
    </div>

    <div class="terms-block">
      <h2>Order confirmation</h2>
      <p>
        Submitting the pre-order form is a request, not a confirmed order. We confirm by email with
        the final date and time. If your requested slot is unavailable, we will propose the closest
        alternative.
      </p>
    </div>

    <div class="terms-block">
      <h2>Payment</h2>
      <p>
        Payment is taken at delivery or pickup — no online checkout yet. We accept cash or card and
        provide an e-receipt (email, SMS, or QR code to a PDF) to keep it paperless.
      </p>
    </div>

    <div class="terms-block">
      <h2>Changes</h2>
      <p>
        Flavor/quantity changes need 48 hours; custom designs may need 72. Small notes (greeting or
        packaging tweaks) can be added up to 24 hours before delivery or pickup. Leave us a note or
        message—if anything is not possible we will let you know, otherwise consider it updated.
      </p>
    </div>

    <div class="terms-block">
      <h2>Delivery Policies</h2>
      <p>
        We deliver within Wünsdorf and Waldstadt only. You choose your desired date and time in the
        pre-order form; we confirm the slot by email. Once confirmed, we deliver then and send a
        quick on-the-way note.
      </p>
    </div>

    <div class="terms-block">
      <h2>Allergies</h2>
      <p>
        We handle gluten, dairy, eggs, and nuts. Cross-contact is possible despite careful prep. We
        are not an allergen-free bakery.
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
