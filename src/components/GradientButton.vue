<template>
  <button>
    <span>{{ label }} <Spinner class="spinner" v-if="isLoading" /></span>
  </button>
</template>

<script lang="ts" setup>
import Spinner from "@/components/Spinner.vue";
defineProps<{
  label: string;
  isLoading?: boolean;
}>();
</script>

<style lang="scss" scoped>
button {
  position: relative;
  background-color: var(--clr-neutral-700);
  border: 1px solid var(--clr-neutral-600);
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  color: var(--clr-neutral-100);
  font-weight: 500;
  overflow: hidden;

  cursor: pointer;

  /* background: var(--clr-neutral-700)
    radial-gradient(circle, var(--clr-brand) 0%, var(--clr-neutral-700) 50%);
  background-size: 20rem 20rem;
  background-position: center;
  background-repeat: no-repeat; */

  & > span {
    position: relative;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    aspect-ratio: 1;
    background-color: transparent;
    border-radius: 100vmax;
    z-index: 0;
    opacity: 0;

    transition: opacity 150ms 75ms ease;

    background: var(--clr-neutral-700)
      radial-gradient(circle, var(--clr-brand) 0%, var(--clr-neutral-700) 50%);
    background-size: 25rem 25rem;
    background-position: center;
    background-repeat: no-repeat;
  }

  &:focus-visible {
    outline: 1px solid var(--clr-brand);
  }

  &:hover,
  &:focus-visible {
    &::before {
      opacity: 0.65;
    }
  }
}

.spinner {
  width: 1rem;
}
</style>
