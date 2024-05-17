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

<script setup>
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  selected: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["optionChange"]);

const optionChange = (event) => {
  emit("optionChange", event.target.value);
};
</script>

<style lang="scss" scoped>
select {
  font-size: 0.9rem;
  appearance: none;
  background-color: var(--clr-neutral-600);
  border: 1px solid var(--clr-neutral-500);
  color: var(--clr-neutral-100);
  padding: 0.35rem 0.85rem;
  text-align: center;
  border-radius: 0.75rem;
}
</style>
