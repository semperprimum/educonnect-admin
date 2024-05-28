<template>
  <ModalBase :onClose="onClose">
    <h2 class="heading">Запросы на замену</h2>

    <div class="substitutions">
      <Accordion elevated name="Әбішев Асылжан Сабыржанович (1)"></Accordion>
      <Accordion elevated name="Төлегенова Айнұр Бауыржанқызы (3)"></Accordion>
      <Accordion elevated name="Попов Денис Валентинович (2)">
        <div class="substitution">
          <p class="substitution__info">
            <span>Основы Front-End</span>
            <span>П-22-59к, 3 пара, понедельник, 02.09.24</span>
          </p>

          <button class="substitution__button">Посмотреть в раписании</button>
        </div>
      </Accordion>
    </div>
  </ModalBase>
</template>

<script lang="ts" setup>
import ModalBase from "@/components/ModalBase.vue";
import Accordion from "@/components/Accordion.vue";

const props = defineProps({
  onClose: {
    type: Function,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.heading {
  font-size: var(--fs-600);
}

.substitutions {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
}

.substitution {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__info {
    display: grid;

    span:nth-child(1) {
      font-weight: var(--fw-bold);
    }
    span:nth-child(2) {
      font-size: var(--fs-100);
      color: var(--clr-neutral-300);
    }
  }

  &__button {
    background-color: var(--clr-neutral-500);
    border: none;
    border-radius: 1vmax;
    padding: 0.5rem 1rem;
    font-size: var(--fs-100);
    font-weight: var(--fw-medium);
    color: var(--clr-neutral-100);
  }
}
</style>
