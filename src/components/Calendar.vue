<template>
  <DatePicker
    v-model.date="props.date"
    :attributes="attributes"
    locale="ru"
    color="red"
    :is-dark="true"
  />
</template>

<script setup lang="ts">
import { DatePicker } from "v-calendar";

const props = defineProps<{
  date: Date;
  attributes?: {
    highlight: string;
    dates: Date[];
  }[];
}>();
</script>

<style lang="scss">
.vc-container {
  @media only screen and (min-width: 48em) {
    --vc-text-2xs: 14px;
    --vc-text-xs: 16px;
    --vc-text-sm: 18px;
    --vc-text-base: 20px;
    --vc-text-lg: 22px;
    --vc-text-xl: 24px;
    --vc-text-2xl: 28px;
  }

  background-color: var(--clr-neutral-700);
  border: 1px solid var(--clr-neutral-600);
  border-radius: 1rem;
  font-family:
    "Inter Variable",
    -apple-system,
    system-ui,
    sans-serif;
  font-size: 1.5rem;

  min-width: 20rem;
}

.vc-weeks {
  padding-top: 1rem;
}

.vc-week {
  padding-block: 0.25rem;
}

.vc-title,
.vc-arrow,
.vc-nav-item,
.vc-nav-title,
.vc-nav-arrow {
  background: transparent;
}

.vc-title {
  text-transform: capitalize;
}

.vc-nav-item,
.vc-weekday {
  color: var(--clr-neutral-300);
}

.vc-gray {
  --vc-accent-500: var(--clr-neutral-600);
}

.vc-popover-content {
  background: var(--clr-neutral-600);
  border: 1px solid var(--clr-neutral-500);
}
</style>
