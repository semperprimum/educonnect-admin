<template>
  <div class="input-group">
    <label
      class="input-group__label"
      :for="id"
      >{{ label }}</label
    >
    <Input
      :id="id"
      :placeholder="placeholder"
    />
    <span
      v-if="error"
      class="input-group__error"
    >
      {{ error }}
    </span>
  </div>
</template>

<script setup>
import Input from "@/components/ui/Input.vue";

const props = defineProps({
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
  error: {
    type: String,
    required: false,
  },
});
</script>

<style lang="scss" scoped>
.input-group {
  display: grid;
  gap: 0.25rem;

  &__label {
    color: var(--clr-neutral-300);
    font-weight: 500;
    font-size: 1.25rem;
  }

  &__error {
    color: var(--clr-error);
    font-size: 0.9rem;
    font-weight: 500;
  }
}
</style>
