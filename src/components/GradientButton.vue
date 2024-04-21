<template>
  <button>
    <span>{{ label }}</span>
  </button>
</template>

<script setup>
const props = defineProps({
  label: {
    required: true,
    type: String,
  },
});
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

  & > span {
    position: relative;
    z-index: 100;
  }

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    aspect-ratio: 1;
    background-color: var(--clr-brand);
    border-radius: 100vmax;
    z-index: 0;
    filter: blur(20rem);
    opacity: 0;

    transition: opacity 150ms 75ms ease;
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
</style>
