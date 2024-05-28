<template>
  <div class="calendar">
    <DatePicker locale="ru" color="red" :is-dark="true" />
  </div>
</template>

<style lang="scss" scoped>
.calendar {
  &:deep(.vc-container) {
    background-color: var(--clr-neutral-700);
    border: 1px solid var(--clr-neutral-600);
    border-radius: 1rem;
    font-family:
      "Inter Variable",
      -apple-system,
      system-ui,
      sans-serif;
  }

  &:deep(.vc-title),
  &:deep(.vc-arrow),
  &:deep(.vc-nav-item),
  &:deep(.vc-nav-title),
  &:deep(.vc-nav-arrow) {
    background: transparent;
  }

  &:deep(.vc-title) {
    text-transform: capitalize;
  }

  &:deep(.vc-nav-item),
  &:deep(.vc-weekday) {
    color: var(--clr-neutral-300);
  }

  &:deep(.vc-gray) {
    --vc-accent-500: var(--clr-neutral-600);
  }

  &:deep(.vc-popover-content) {
    background: var(--clr-neutral-600);
    border: 1px solid var(--clr-neutral-500);
  }
}
</style>
