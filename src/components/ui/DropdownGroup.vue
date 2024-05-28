<template>
  <div class="dropdown-group">
    <label class="dropdown-group__label" :for="id">{{ label }}</label>
    <Dropdown
      @onChange="(value) => emit('onChange', value)"
      v-bind="{ placeholder, id, label, options, selected, elevated }"
    />
  </div>
</template>

<script lang="ts" setup>
import Dropdown from "@/components/ui/Dropdown.vue";
import { type DropdownOption } from "@/types";

const emit = defineEmits(["onChange"]);

defineProps<{
  options: DropdownOption[];
  label: string;
  id: string;
  selected: DropdownOption;
  elevated?: boolean;
  placeholder?: string;
}>();
</script>

<style lang="scss" scoped>
.dropdown-group {
  display: grid;
  gap: 0.25rem;

  &__label {
    color: var(--clr-neutral-300);
    font-weight: var(--fw-medium);
    font-size: var(--fs-300);
  }
}
</style>
