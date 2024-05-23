<template>
  <input
    type="checkbox"
    class="checkbox"
  />
</template>

<style lang="scss" scoped>
.checkbox {
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  margin: 0;

  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid var(--clr-neutral-500);
  border-radius: 1rem;

  display: grid;
  place-items: center;

  &::before {
    content: url("/icons/checkmark.svg");
    width: 0.75rem;
    height: 0.75rem;
    transform: scale(0);
    transition: transform 150ms ease;

    display: grid;
    place-items: center;
  }

  &:checked {
    border: 1px solid var(--clr-neutral-300);

    &::before {
      transform: scale(1);
    }
  }
}
</style>
