<template>
  <section class="qa">
    <header class="page-header">
      <h1>Q &amp; A</h1>
    </header>

    <n-card :bordered="false" class="qa-card">
      <n-collapse default-expanded-names="q1">
        <n-collapse-item
          v-for="item in faqs"
          :key="item.name"
          :title="item.question"
          :name="item.name"
        >
          <p class="answer">{{ item.answer }}</p>
        </n-collapse-item>
      </n-collapse>
    </n-card>
  </section>
</template>

<script setup>
import { branding } from '../config/branding';
import { NCard, NCollapse, NCollapseItem } from 'naive-ui';

const faqs = [
  {
    name: 'q1',
    question: 'How far in advance should I place an order?',
    answer:
      'For standard items, 48 hours is ideal. For custom decor or larger quantities, please allow 4–5 days so we can confirm ingredients and timing.',
  },
  {
    name: 'qColors',
    question: 'Do you use artificial food colouring?',
    answer:
      'No. We use 100% natural colors from fruit and vegetable powders (Bright Foods)—so the bright shades come from real produce, not synthetic dyes. If you have sensitivities, please check allergens and feel free to contact us.',
  },
  {
    name: 'q2',
    question: 'Do you offer delivery?',
    answer: `Yes—${branding.deliveryArea}. You choose your desired date and time in the pre-order form; we confirm the slot by email. Once confirmed, we deliver then and message when we're on the way.`,
  },
  {
    name: 'q3',
    question: 'Can I request dietary tweaks?',
    answer:
      'We offer select vegan and gluten-light options. Share your needs at checkout and we will confirm what is possible for your chosen items.',
  },
  {
    name: 'qPayment',
    question: 'How do I pay and get a receipt?',
    answer:
      'Pay at delivery or pickup by cash or card. We issue e-receipts only (email, SMS, or QR code to a PDF) to stay paperless.',
  },
  {
    name: 'q4',
    question: 'What if I need a specific serving count?',
    answer:
      'Most items list servings; for cupcakes and cookies you can pick box sizes. If you need an exact count, add it in the notes and we will match the closest pack size.',
  },
  {
    name: 'q5',
    question: 'How do I store the bakes?',
    answer:
      'Cakes and tarts are best chilled and brought to room temp 30 minutes before serving. Rolls and cookies can be kept in an airtight box at room temp for 1–2 days.',
  },
  {
    name: 'q6',
    question: 'What is your refund policy?',
    answer:
      'If there is an issue with your order, please contact us within 24 hours of delivery. We will review and offer a refund or replacement as appropriate.',
  },
  {    
    name: 'q7',
    question: 'Can I make changes to my order after checkout?',
    answer:
      'Flavor/quantity changes need 48 hours (custom designs may need 72). Small notes like greetings or packaging tweaks can be added up to 24 hours before delivery or pickup. If something is not possible we will let you know.',
  },
  {
    name: 'q8',
    question: 'Do you accommodate custom designs or themes?',
    answer:
      'Yes, we love creating custom designs! Please reach out with your ideas at least 5 days in advance so we can discuss details and feasibility.',
  },
  // {
  //   name: 'q9',
  //   question: 'Are there any seasonal items or limited-time offers?',
  //   answer:
  //     'Yes, we offer seasonal flavors and limited-time items throughout the year. Check our products page or subscribe to our newsletter for updates on new offerings.',
  // },
  {
    name: 'q10',
    question: 'What allergens do the cakes containe?',
    answer:
      'All cakes contain wheat, eggs & milk, unless otherwise specified (Vegan options available!). Please note that all products are made in a bakery that handles nuts, gluten, milk, eggs, peanuts and other allergens; If you have a severe allergy, please know that while we do our best to prevent cross-contamination, we are not an allergy-free bakery.',
  }
];
</script>

<style scoped>
.qa {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.qa-card {
  padding: 12px;
}

.answer {
  margin: 0;
  color: #374151;
  line-height: 1.5;
}

:deep(.n-collapse-item__header-main) {
  text-transform: uppercase;
}
</style>
