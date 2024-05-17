<template>
  <div class="accordion">
    <button
      @click.prevent="toggleIsOpen"
      class="accordion__button"
    >
      <span>
        Управление предметами
        <ChevronUp
          v-if="isOpen"
          aria-hidden="true"
        />
        <ChevronDown
          v-else
          aria-hidden="true"
        />
      </span>
    </button>

    <div
      v-if="isOpen"
      class="accordion__content"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import ChevronDown from "@/assets/icons/ChevronDown.vue";
import ChevronUp from "@/assets/icons/ChevronUp.vue";
import { ref } from "vue";

const isOpen = ref(false);

const toggleIsOpen = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style lang="scss" scoped>
.accordion {
  background-color: var(--clr-neutral-700);
  border: 1px solid var(--clr-neutral-600);
  border-radius: 1rem;

  &__button {
    color: var(--clr-neutral-300);
    background: none;
    padding: 0.75rem 1rem;
    border: none;
    /* outline: 1px solid lime; */
    width: 100%;

    span {
      display: flex;
      align-items: center;
      justify-content: space-between;

      svg {
        display: block;
        width: 1rem;
        aspect-ratio: 1;

        fill: currentColor;
      }
    }

    @media only screen and (min-width: 48em) {
      cursor: pointer;
    }
  }

  &__content {
    padding: 0 1rem 0.75rem;
  }
}
</style>
