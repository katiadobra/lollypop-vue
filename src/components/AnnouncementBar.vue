<template>
  <div v-if="activeAnnouncement" class="announcement-wrapper">
    <n-alert :type="activeAnnouncement.type || 'info'" show-icon :bordered="false" class="announcement">
      <span class="announcement-text">{{ activeAnnouncement.message }}</span>
    </n-alert>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { announcements } from '../data/announcements';

function asDate(input) {
  if (!input) return null;
  const isMonthDay = /^\d{2}-\d{2}$/.test(input);
  if (isMonthDay) {
    const year = new Date().getFullYear();
    return new Date(`${year}-${input}`);
  }
  return new Date(input);
}

function isActive(entry, now) {
  const start = asDate(entry.start);
  const end = asDate(entry.end);
  const dayMatches = Array.isArray(entry.daysOfWeek) ? entry.daysOfWeek.includes(now.getDay()) : true;

  if (!dayMatches) return false;

  if (start && end) {
    return now >= start && now <= end;
  }
  if (start && !end) return now >= start;
  if (!start && end) return now <= end;
  return true;
}

const activeAnnouncement = computed(() => {
  const now = new Date();
  return announcements.find((entry) => isActive(entry, now)) || null;
});
</script>

<style scoped>
.announcement-wrapper {
  background: #fd219b;
  padding: 0;
}

.announcement {
  margin: 0 auto;
  max-width: 1200px;
  color: #fff;
  background-color: transparent;
  text-align: center;
}

.announcement-text {
  font-weight: 600;
  color: #fff;
}
</style>
