<!-- 404 -->
<template>
  <n-result
    class="content-inner"
    status="404"
    title="404 Page Not Found"
    description="You know life is always ridiculous."
  >
    <template #icon>
      <span class="result-icon" aria-label="Cake" role="img">🍰</span>
    </template>
    <template #footer>
      <RouterLink to="/products" class="button-link">
        <n-button type="primary" color="#ff69b4" size="large">Find Some Treats</n-button>
      </RouterLink>
    </template>
  </n-result>
</template>

<script setup>
import { NButton, NResult } from 'naive-ui';
</script>

<style scoped>
.result-icon {
  font-size: 48px;
  line-height: 1;
}

.button-link {
  text-decoration: none;
  color: inherit;
}
</style>
