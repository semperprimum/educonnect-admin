<template>
  <div class="dropdown" ref="dropdown" :id="id">
    <button
      @click.prevent="isDropdownOpen = !isDropdownOpen"
      class="dropdown__selected"
      :class="{ elevated }"
    >
      {{ selectedOption?.name || placeholder || label }}
      <ChevronDown aria-hidden="true" />
    </button>

    <div v-if="isDropdownOpen" class="dropdown__options">
      <button
        v-for="option in options"
        :key="option.value"
        @click.prevent="handleOptionSelect(option)"
        class="dropdown__option"
        :class="{ active: selectedOption?.value === option.value }"
      >
        {{ option.name }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import ChevronDown from "@/assets/icons/ChevronDown.vue";
import { type DropdownOption } from "@/types";

const props = defineProps<{
  options: DropdownOption[];
  label: string;
  placeholder?: string;
  id?: string;
  selected?: DropdownOption;
  elevated?: boolean;
}>();

const dropdown = ref(null);

const selectedOption = ref(props.selected || null);
const isDropdownOpen = ref(false);

const emit = defineEmits(["onChange"]);

const handleOptionSelect = (option: DropdownOption) => {
  selectedOption.value = option;
  isDropdownOpen.value = false;

  emit("onChange", selectedOption.value);
};

onClickOutside(dropdown, () => {
  isDropdownOpen.value = false;
});
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;

  &__selected {
    text-transform: capitalize;
    background-color: var(--clr-neutral-700);
    color: var(--clr-neutral-300);
    border: 1px solid var(--clr-neutral-600);
    padding: 0.75rem 1rem;
    font-weight: var(--fw-medium);
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

    &.elevated {
      background-color: var(--clr-neutral-600);
      border: 1px solid var(--clr-neutral-500);
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

    max-height: 20rem;
    overflow: auto;

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
    font-weight: var(--fw-medium);
    border-radius: 0.5rem;

    white-space: nowrap;

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
