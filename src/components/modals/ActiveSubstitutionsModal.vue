<template>
  <ModalBase :onClose="onClose">
    <div class="header">
      <div class="header__pair">
        <h2 class="header__heading">Активные замены</h2>
        <span class="header__date">02.09.24</span>
      </div>

      <div class="header__buttons">
        <button class="header__button">
          <ArrowLeft />
        </button>
        <button class="header__button">
          <ArrowRight />
        </button>
      </div>
    </div>

    <div class="accordions-container">
      <Accordion elevated name="П-21-55гб (1)"></Accordion>
      <Accordion elevated name="П-21-56б (3)"></Accordion>
      <Accordion elevated name="П-21-57к (2)">
        <div class="substitution">
          <span>Разработка мобильных приложений</span>
          <span>4 пара, понедельник, 02.09.24</span>
        </div>
        <div class="substitution">
          <span>Основы Front-End</span>
          <span>3 пара, понедельник, 02.09.24</span>
        </div>
      </Accordion>
    </div>
  </ModalBase>
</template>

<script lang="ts" setup>
import ModalBase from "@/components/ModalBase.vue";
import ArrowLeft from "@/assets/icons/ArrowLeft.vue";
import ArrowRight from "@/assets/icons/ArrowRight.vue";
import Accordion from "../Accordion.vue";

const props = defineProps({
  onClose: {
    type: Function,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__heading {
    font-size: var(--fs-600);
  }

  &__date {
    color: var(--clr-neutral-300);
    font-weight: var(--fw-medium);
  }

  &__buttons {
    display: flex;
    gap: 0.5rem;
  }

  &__button {
    border: 1px solid var(--clr-neutral-500);
    background-color: var(--clr-neutral-600);
    margin: 0;
    padding: 0.5rem;
    border-radius: 0.5rem;
    aspect-ratio: 1;

    svg {
      display: block;
      height: 1.5rem;
      width: 100%;
      aspect-ratio: 1;

      fill: var(--clr-neutral-300);
    }
  }
}

.accordions-container {
  margin-top: 1.5rem;
  display: grid;
  gap: 1rem;
}

.substitution {
  span {
    display: block;

    &:nth-child(1) {
      font-weight: var(--fw-bold);
    }

    &:nth-child(2) {
      color: var(--clr-neutral-300);
      font-size: var(--fs-100);
    }
  }

  & + & {
    margin-top: 1rem;
  }
}
</style>
