<template>
  <div class="input-group">
    <label
      class="input-group__label"
      :for="id"
      >{{ label }}</label
    >
    <Input
      @onChange="(value) => emit('onChange', value)"
      v-bind="{ id, placeholder, elevated }"
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

const emit = defineEmits(["onChange"]);

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
  elevated: {
    type: Boolean,
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
