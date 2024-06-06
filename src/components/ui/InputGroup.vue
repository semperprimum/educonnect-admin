<template>
  <div class="input-group">
    <label class="input-group__label" :for="id">{{ label }}</label>
    <Input v-bind="{ id, placeholder, elevated, disabled, value }" />
    <span v-if="error" class="input-group__error">
      {{ error }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import Input from "@/components/ui/Input.vue";

defineProps<{
  label: string;
  id: string;
  placeholder?: string;
  error?: string;
  elevated?: boolean;
  disabled?: boolean;
  value?: string;
}>();
</script>

<style lang="scss" scoped>
.input-group {
  display: grid;
  gap: 0.25rem;

  &__label {
    color: var(--clr-neutral-300);
    font-size: var(--fs-300);
    font-weight: var(--fw-bold);
  }

  &__error {
    color: var(--clr-error);
    font-size: 0.9rem;
    font-weight: 500;
  }
}
</style>
