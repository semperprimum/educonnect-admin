<template>
  <select @change="optionChange">
    <option value="">{{ placeholder }}</option>
    <option
      v-for="option in options"
      :value="option"
      :selected="option === selected"
    >
      {{ option }}
    </option>
  </select>
</template>

<script lang="ts" setup>
defineProps<{
  options: string[];
  placeholder: string;
  selected: string;
}>();

const emit = defineEmits(["optionChange"]);

const optionChange = (event: Event) => {
  emit("optionChange", (event.target as HTMLSelectElement).value);
};
</script>

<style lang="scss" scoped>
select {
  font-size: var(--fs-100);
  appearance: none;
  background-color: var(--clr-neutral-600);
  border: 1px solid var(--clr-neutral-500);
  color: var(--clr-neutral-100);
  padding: 0.35rem 0.85rem;
  text-align: center;
  border-radius: 0.75rem;
}
</style>
