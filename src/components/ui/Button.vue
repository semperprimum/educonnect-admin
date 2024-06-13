<template>
  <button :class="{ center, elevated, danger }">
    <Spinner class="spinner" v-if="isLoading" />

    <span v-else>
      {{ label }}
      <component
        aria-hidden="true"
        class="trailing"
        v-if="trailing"
        :is="trailing"
      />
    </span>
  </button>
</template>

<script lang="ts" setup>
import { type Component } from "vue";
import Spinner from "@/components/Spinner.vue";

defineProps<{
  label: string;
  trailing?: Component;
  danger?: boolean;
  center?: boolean;
  elevated?: boolean;
  isLoading?: boolean;
}>();
</script>

<style lang="scss" scoped>
button {
  background-color: var(--clr-neutral-700);
  color: var(--clr-neutral-300);
  border: 1px solid var(--clr-neutral-600);
  border-radius: 1rem;
  line-height: auto;
  padding: 0.75rem 1rem;
  font-weight: 500;

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    font-size: var(--fs-200);
  }

  @media only screen and (min-width: 48em) {
    transition: filter 150ms ease;
    cursor: pointer;

    &:hover {
      filter: brightness(1.25);
    }
  }

  &.center {
    display: grid;
    place-items: center;
  }

  &.elevated {
    background-color: var(--clr-neutral-600);
    border: 1px solid var(--clr-neutral-500);
  }
  &.danger {
    background-color: var(--clr-red-400);
    border: 1px solid var(--clr-red-300);
    color: var(--clr-neutral-100);
  }
}

.trailing {
  width: 1rem;
  aspect-ratio: 1;
  fill: currentColor;
}

.spinner {
  width: 1rem;
}
</style>
