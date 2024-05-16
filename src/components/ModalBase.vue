<template>
  <dialog
    class="dialog"
    @click="onClose"
    ref="dialog"
  >
    <div
      ref="dialogContent"
      class="dialog-content"
    >
      <slot></slot>
      <button
        class="close-button"
        @click="onClose"
      >
        <Xmark />
      </button>
    </div>
  </dialog>
</template>

<script setup>
import Xmark from "@/assets/icons/Xmark.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  onClose: {
    type: Function,
    required: true,
  },
});

const dialog = ref(null);
const dialogContent = ref(null);

onMounted(() => {
  dialog.value.showModal();

  dialogContent.value.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});

// Следующий код добавляет `overflow: auto` на модалку,
// если в ней слишком много контента.
// Это нужно для того, чтобы dropdowns в модалке
// отображались корректно, если количество
// контента это позволяет.
const toggleOverflowClass = () => {
  if (!dialog.value || !dialogContent.value) return;

  const dialogElement = dialog.value;
  const contentElement = dialogContent.value;

  if (contentElement.scrollHeight > dialogElement.clientHeight) {
    contentElement.classList.add("overflow-auto");
  } else {
    contentElement.classList.remove("overflow-auto");
  }
};

let resizeObserver;

onMounted(() => {
  if (dialogContent.value) {
    resizeObserver = new ResizeObserver(toggleOverflowClass);
    resizeObserver.observe(dialogContent.value);
    toggleOverflowClass();
  }
});

onBeforeUnmount(() => {
  if (resizeObserver && dialogContent.value) {
    resizeObserver.unobserve(dialogContent.value);
  }
});
</script>

<style lang="scss" scoped>
.dialog {
  position: relative;
  padding: 0;
  overflow: visible;
  background: var(--clr-neutral-700);
  color: var(--clr-neutral-100);
  border: 1px solid var(--clr-neutral-600);
  border-radius: 1.5rem;

  width: min(calc(100% - 3rem), 40rem);

  animation: scaleAppear 300ms ease forwards;

  &::backdrop {
    background: var(--clr-neutral-900);
    opacity: 0.5;
  }
}

.dialog-content {
  padding: 1rem;
  overflow: visible;
  max-height: calc(100dvh - 6rem);

  &.overflow-auto {
    overflow: auto;
  }
}

.close-button {
  padding: 0.5rem;
  border-radius: 100vmax;
  border: none;

  position: absolute;
  top: -1rem;
  right: -1rem;

  background: var(--clr-neutral-600);
  border: 1px solid var(--clr-neutral-500);

  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  svg {
    display: block;
    width: 1rem;
    aspect-ratio: 1;
    fill: var(--clr-neutral-300);
  }

  @media only screen and (min-width: 48em) {
    cursor: pointer;

    &:hover {
      filter: brightness(1.25);
    }
  }
}
</style>
