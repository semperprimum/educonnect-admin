<template>
  <div class="picker">
    <span class="picker__label">{{ t("group_color") }}</span>

    <div class="picker__container">
      <button
        v-for="color in colors"
        @click.prevent="handleColorSelect(color)"
        :style="{ '--clr': '#' + color }"
        :key="color"
        class="picker__color-button"
        :class="{ selected: color === selectedColor }"
      ></button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const selectedColor = ref("");
const { t } = useI18n();

const emit = defineEmits(["colorChange"]);

const handleColorSelect = (color: string) => {
  selectedColor.value = color;
  emit("colorChange", selectedColor.value);
};

onMounted(() => {
  selectedColor.value =
    colors.value[Math.floor(Math.random() * colors.value.length)];
  emit("colorChange", selectedColor.value);
});

const colors = ref([
  "EF4444",
  "F97316",
  "EAB308",
  "22C55E",
  "0EA5E9",
  "8B5CF6",
  "EC4899",
  "F87171",
  "FB923C",
  "FDE047",
  "4ADE80",
  "60A5FA",
  "C084FC",
  "F472B6",
  "FCA5A5",
  "FDBA74",
  "FEF08A",
  "86EFAC",
  "93C5FD",
  "D8B4FE",
  "F9A8D4",
]);
</script>

<style lang="scss" scoped>
.picker {
  &__label {
    display: block;
    color: var(--clr-neutral-300);
    font-weight: 500;
    font-size: var(--fs-300);
    margin-bottom: 0.25rem;
  }

  &__container {
    background-color: var(--clr-neutral-600);
    border: 1px solid var(--clr-neutral-500);
    border-radius: 1rem;
    padding: 1rem;

    max-width: fit-content;

    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1rem 2rem;
  }

  &__color-button {
    width: 1.5rem;
    aspect-ratio: 1;
    background-color: var(--clr);
    border: none;
    border-radius: 100vmax;

    cursor: pointer;

    &.selected {
      outline: 3px solid white;
    }
  }
}
</style>
