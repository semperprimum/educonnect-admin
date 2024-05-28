<template>
  <div ref="menuContainer" class="menu">
    <button @click="toggleMenu" ref="button" class="menu__toggle">
      <ElipsisVertical />
    </button>

    <div v-if="isMenuVisible" ref="menu" class="menu__main">
      <button
        v-for="option in options"
        class="menu__option-button"
        @click="
          () => {
            option.action();
            toggleMenu();
          }
        "
      >
        {{ option.name }}
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import ElipsisVertical from "@/assets/icons/ElipsisVertical.vue";
import { ref, onBeforeUnmount, nextTick } from "vue";
import { createPopper } from "@popperjs/core";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
});

const isMenuVisible = ref(false);
const menuContainer = ref(null);
const menu = ref(null);
const button = ref(null);
let popperInstance = null;

const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;

  if (isMenuVisible.value) {
    // nextTick() нужен из-за v-if, иначе menu.value будет null
    nextTick(() => {
      createPopperInstance();
    });
  } else {
    destroyPopperInstance();
  }
};

onClickOutside(menuContainer, () => {
  isMenuVisible.value = false;
});

const createPopperInstance = () => {
  if (menu.value && button.value) {
    popperInstance = createPopper(button.value, menu.value, {
      placement: "right-start",
    });
  }
};

const destroyPopperInstance = () => {
  if (popperInstance) {
    popperInstance.destroy();
    popperInstance = null;
  }
};

onBeforeUnmount(() => {
  destroyPopperInstance();
});
</script>

<style lang="scss" scoped>
.menu {
  position: relative;

  &__toggle {
    background: none;
    border: none;
    color: var(--clr-neutral-300);
    padding: 0;

    display: grid;
    place-items: center;

    svg {
      display: block;
      height: 1.25rem;
      width: 1.25rem;
      fill: currentColor;
    }
  }

  &__main {
    background-color: var(--clr-neutral-700);
    border: 1px solid var(--clr-neutral-600);
    border-radius: 0.75rem;
    padding: 0.5rem;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    z-index: 999;

    display: grid;

    animation: scaleAppear 150ms ease forwards;
  }

  &__option-button {
    background-color: transparent;
    color: var(--clr-neutral-300);
    border: none;
    text-align: start;
    border-radius: 0.5rem;
    padding: 0.25rem 0.75rem;
    cursor: pointer;

    white-space: nowrap;

    &:hover {
      background-color: var(--clr-neutral-600);
    }
  }
}
</style>
