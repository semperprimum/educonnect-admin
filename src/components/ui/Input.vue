<template>
  <div class="input-container" :class="{ elevated }">
    <input
      :type="type || 'text'"
      :placeholder="placeholder"
      :id="id"
      :disabled="disabled"
      :value="modelValue"
      @input="
        (event: Event) => {
          emit('update:modelValue', (event.target as HTMLInputElement).value);
        }
      "
    />
    <component class="trailing" v-if="trailing" :is="trailing" />
  </div>
  <ErrorText v-if="error" class="error" :class="{ nem: noErrorMargin }">{{
    error
  }}</ErrorText>
</template>

<script lang="ts" setup>
import type { Component } from "vue";
import ErrorText from "@/components/ErrorText.vue";

const emit = defineEmits(["update:modelValue"]);

defineProps<{
  placeholder?: string;
  error?: string;
  id?: string;
  type?: string;
  trailing?: Component;
  elevated?: boolean;
  modelValue?: string;
  disabled?: boolean;
  noErrorMargin?: boolean;
}>();
</script>

<style lang="scss" scoped>
.input-container {
  display: flex;
  align-items: center;

  background-color: var(--clr-neutral-700);
  border: 1px solid var(--clr-neutral-600);

  &.elevated {
    background-color: var(--clr-neutral-600);
    border: 1px solid var(--clr-neutral-500);
  }

  border-radius: 1rem;

  &:focus-within {
    outline: 1px solid var(--clr-brand);
  }

  &:has(input[disabled]) {
    opacity: 0.5;
  }
}

input {
  width: 100%;
  padding: 0.75rem 1rem;
  flex: 1;

  background: none;
  border: none;

  line-height: auto;
  color: var(--clr-neutral-100);
  caret-color: var(--clr-brand);
  font-weight: var(--fw-medium);

  outline: none;

  &[disabled] {
    cursor: not-allowed;
  }
}

.trailing {
  height: var(--fs-300);
  aspect-ratio: 1;
  margin-right: 1rem;
  fill: var(--clr-neutral-300);
}

.error {
  margin-top: -0.75rem;

  &.nem {
    margin-top: 0;
  }
}
</style>
