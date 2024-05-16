<template>
  <div class="dropdown-group">
    <label
      class="dropdown-group__label"
      :for="id"
      >{{ label }}</label
    >
    <Dropdown
      v-bind="{ placeholder, id, label, options, selected, elevated }"
    />
  </div>
</template>

<script setup>
import Dropdown from "@/components/ui/Dropdown.vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
  id: {
    type: String,
    required: true,
  },
  selected: {
    type: Object,
    required: false,
  },
  elevated: {
    type: Boolean,
    required: false,
  },
});
</script>

<style lang="scss" scoped>
.dropdown-group {
  display: grid;
  gap: 0.25rem;

  &__label {
    color: var(--clr-neutral-300);
    font-weight: 500;
    font-size: 1.25rem;
  }
}
</style>
