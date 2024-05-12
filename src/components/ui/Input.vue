<template>
  <div class="input-container">
    <input
      :type="type || 'text'"
      :placeholder="placeholder"
      :id="id"
    />
    <component
      class="trailing"
      v-if="trailing"
      :is="trailing"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  placeholder: {
    required: false,
    type: String,
  },
  id: {
    required: false,
    type: String,
  },
  type: {
    required: false,
    type: String,
  },
  trailing: {
    required: false,
    type: Object,
  },
});
</script>

<style lang="scss" scoped>
.input-container {
  display: flex;
  align-items: center;

  background-color: var(--clr-neutral-700);
  border: 1px solid var(--clr-neutral-600);

  border-radius: 1rem;

  &:focus-within {
    outline: 1px solid var(--clr-brand);
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
  font-weight: 500;

  outline: none;
}

.trailing {
  height: 1.25rem;
  aspect-ratio: 1;
  margin-right: 1rem;
  fill: var(--clr-neutral-300);
}
</style>
