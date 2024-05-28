<template>
  <ModalBase :onClose="onClose">
    <div class="header">
      <h2 class="header__heading">Замена</h2>
      <span class="header__info"
        >Понедельник, 2 пара | Программирование | П-21-57к</span
      >
      <span class="header__date">02.09.24</span>
    </div>

    <div class="substitution">
      <p class="substitution__label">Заменить на:</p>
      <Dropdown
        elevated
        label="Предмет"
        :options="[
          {
            name: 'Основы Front-End, Попов Денис Валентинович',
            value: 1,
          },
          {
            name: 'Проектирование ПО, Стасишина Татьяна Григорьевна',
            value: 2,
          },
        ]"
      />
      <Dropdown
        :options="[
          {
            name: 'Все студенты',
            value: 1,
          },
          {
            name: 'Группа А',
            value: 2,
          },
          {
            name: 'Группа Б',
            value: 1,
          },
        ]"
        elevated
        label="Студенты"
      />
    </div>

    <Button class="approve-button" elevated center label="Одобрить замену" />
  </ModalBase>
</template>

<script lang="ts" setup>
import ModalBase from "@/components/ModalBase.vue";
import Dropdown from "@/components/ui/Dropdown.vue";
import Button from "@/components/ui/Button.vue";

const props = defineProps({
  onClose: {
    type: Function,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.header {
  &__heading {
    font-size: var(--fs-600);
  }

  &__info,
  &__date {
    display: block;
    color: var(--clr-neutral-300);
  }
}

.substitution {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;

  &__label {
    font-size: var(--fs-400);
    font-weight: var(--fw-medium);
  }
}

.approve-button {
  width: 100%;
  margin-top: 2rem;
}
</style>
