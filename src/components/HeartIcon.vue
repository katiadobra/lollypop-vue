<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    :class="{ 'is-active': active, 'is-popping': popping }"
  >
    <path
      :d="path"
      :fill="active ? color : 'none'"
      :stroke="active ? color : strokeColor"
      stroke-width="1.8"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
  </svg>
</template>

<script setup>
import { onBeforeUnmount, ref, watch } from 'vue';

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  size: {
    type: [Number, String],
    default: 18,
  },
  color: {
    type: String,
    default: '#ff69b4',
  },
});

const strokeColor = '#6b7280';

// Simple heart outline path for consistent icon across the app
const path =
  'M12 21s-6.6-4.35-9.4-8.13C1 10.26 1.49 6.67 4.31 4.9c2.02-1.26 4.69-.74 6.18 1.02C11.98 4.16 14.65 3.64 16.67 4.9 19.49 6.67 20 10.26 18.4 12.87 14.6 16.65 12 21 12 21Z';

const popping = ref(false);
let timer = null;

function triggerPop() {
  popping.value = false;
  requestAnimationFrame(() => {
    popping.value = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      popping.value = false;
    }, 220);
  });
}

watch(
  () => props.active,
  () => {
    triggerPop();
  },
  { immediate: false },
);

onBeforeUnmount(() => {
  clearTimeout(timer);
});
</script>

<style scoped>
svg {
  transition: transform 160ms ease, stroke 160ms ease, fill 160ms ease;
}

svg.is-popping {
  animation: heart-pop 220ms ease;
}

@keyframes heart-pop {
  0% {
    transform: scale(1);
  }
  35% {
    transform: scale(1.18);
  }
  100% {
    transform: scale(1);
  }
}
</style>
