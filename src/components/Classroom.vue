<template>
  <div v-if="classrooms" class="container">
    <div ref="target" :class="{ expandable: classrooms[1] }" class="classroom">
      <span v-if="!classrooms[1]">{{ classrooms[0] }}</span>
      <span v-else>...</span>
    </div>

    <div ref="tooltip" class="tooltip">
      <p class="tooltip__item">Гр. А: {{ classrooms[0] }}</p>
      <p class="tooltip__item">Гр. Б: {{ classrooms[1] }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createPopper, type Instance } from "@popperjs/core";
import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";

const target = ref<Ref<HTMLDivElement> | null>(null);
const tooltip = ref<Ref<HTMLDivElement> | null>(null);
let popperInstance: Instance | null = null;

const props = defineProps<{
  classrooms: string[] | null;
}>();

const show = () => {
  if (!tooltip.value) return;

  tooltip.value.setAttribute("data-show", "");
  popperInstance?.update();
};

const hide = () => {
  if (!tooltip.value) return;

  tooltip.value.removeAttribute("data-show");
};

onMounted(() => {
  if (!props.classrooms || props.classrooms?.length === 1) return;

  if (props.classrooms.length > 2) {
    throw new Error("More than two items were passed to classrooms array");
  }

  if (!target.value || !tooltip.value) return;

  popperInstance = createPopper(target.value, tooltip.value, {
    placement: "left",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  target.value.addEventListener("mouseenter", show);
  target.value.addEventListener("mouseleave", hide);
});

onBeforeUnmount(() => {
  popperInstance?.destroy();
});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}

.classroom {
  width: 3.5rem;
  height: 1.75rem;
  background-color: var(--clr-neutral-700);
  border: 1px solid var(--clr-neutral-600);
  color: white;
  border-radius: 0.35rem;
  font-size: var(--fs-100);

  display: grid;
  place-items: center;

  mix-blend-mode: color-dodge;

  &.expandable {
    cursor: pointer;
  }
}

.tooltip {
  background: var(--clr-neutral-700);
  border: 1px solid var(--clr-neutral-600);
  padding: 0.5rem;
  border-radius: 0.35rem;

  mix-blend-mode: color-dodge;

  display: none;

  &[data-show] {
    display: block;
  }

  animation: fadeInFull 200ms forwards;

  &__item {
    white-space: nowrap;

    text-shadow: 1px 1px 1px var(--clr-neutral-900);
  }
}
</style>
