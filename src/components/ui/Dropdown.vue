<template>
  <div
    class="dropdown"
    ref="dropdown"
    :id="id"
  >
    <button
      @click="isDropdownOpen = !isDropdownOpen"
      class="dropdown__selected"
    >
      {{ selectedOption?.name || label }}
      <ChevronDown aria-hidden="true" />
    </button>

    <div
      v-if="isDropdownOpen"
      class="dropdown__options"
    >
      <button
        v-for="option in options"
        @click="handleOptionSelect(option)"
        class="dropdown__option"
        :class="{ active: selectedOption?.value === option.value }"
      >
        {{ option.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import ChevronDown from "@/assets/icons/ChevronDown.vue";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: false,
  },
  selected: {
    type: Object,
    required: false,
  },
});

const dropdown = ref(null);

const selectedOption = ref(props.selected || null);
const isDropdownOpen = ref(false);

const handleOptionSelect = (option) => {
  selectedOption.value = option;
  isDropdownOpen.value = false;
};

onClickOutside(dropdown, () => {
  isDropdownOpen.value = false;
});
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;

  &__selected {
    min-width: 12.5rem;
    text-transform: capitalize;
    background-color: var(--clr-neutral-700);
    color: var(--clr-neutral-300);
    border: 1px solid var(--clr-neutral-600);
    padding: 0.75rem 1rem;
    /* font-size: 1.15rem; */
    font-weight: 500;
    border-radius: 1rem;
    line-height: auto;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;

    svg {
      width: 1.125rem;
      aspect-ratio: 1;
      fill: currentColor;
    }

    @media only screen and (min-width: 48em) {
      cursor: pointer;
      transition: filter 125ms ease;

      &:hover {
        filter: brightness(1.25);
      }
    }
  }

  &__options {
    display: grid;
    justify-content: start;
    position: absolute;
    top: 3.75rem;
    left: 0;

    z-index: 9999;

    background-color: var(--clr-neutral-700);
    max-width: fit-content;
    padding: 0.5rem;
    border-radius: 1rem;
    border: 1px solid var(--clr-neutral-600);

    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    animation: appearBlur 150ms ease forwards;
  }

  &__option {
    text-align: start;
    text-transform: capitalize;
    border: none;
    background: none;
    color: var(--clr-neutral-300);
    padding: 0.375rem 0.75rem;
    font-weight: 500;
    border-radius: 0.5rem;

    &:hover {
      background-color: var(--clr-neutral-500);
      color: var(--clr-neutral-100);
    }
  }
}

.active {
  background-color: var(--clr-neutral-600);
  color: var(--clr-neutral-100);
}
</style>
