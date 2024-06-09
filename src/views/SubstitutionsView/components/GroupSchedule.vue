<template>
  <div class="container">
    <div class="header">
      <h3 class="header__literals">П-21-57к</h3>

      <div class="header__buttons">
        <button class="header__btn selected">Все</button>
        <button class="header__btn">А</button>
        <button class="header__btn">Б</button>
      </div>
    </div>

    <ul class="schedule">
      <li class="schedule__item">
        <div class="schedule__info">
          <p class="schedule__name">Нет пары</p>
          <span class="schedule__class">1308</span>
        </div>
        <ElipsisMenu :options="[{ name: 'temp', action: () => {} }]" />
      </li>
      <li class="schedule__item">
        <div class="schedule__info">
          <p class="schedule__name">Нет пары</p>
          <span class="schedule__class">1308</span>
        </div>
        <ElipsisMenu :options="[{ name: 'temp', action: () => {} }]" />
      </li>
      <li class="schedule__item">
        <div class="schedule__info">
          <p class="schedule__name">Нет пары</p>
          <span class="schedule__class">1308</span>
        </div>
        <ElipsisMenu :options="[{ name: 'temp', action: () => {} }]" />
      </li>
      <li class="schedule__item">
        <div class="schedule__info">
          <p class="schedule__name">Нет пары</p>
          <span class="schedule__class">1308</span>
        </div>
        <ElipsisMenu :options="[{ name: 'temp', action: () => {} }]" />
      </li>
      <li class="schedule__item">
        <div class="schedule__info">
          <p class="schedule__name">Нет пары</p>
          <span class="schedule__class">1308</span>
        </div>
        <ElipsisMenu :options="[{ name: 'temp', action: () => {} }]" />
      </li>
      <li class="schedule__item">
        <div class="schedule__info">
          <p class="schedule__name">Нет пары</p>
          <span class="schedule__class">1308</span>
        </div>
        <ElipsisMenu :options="[{ name: 'temp', action: () => {} }]" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ElipsisMenu from "@/components/ui/ElipsisMenu.vue";
</script>

<style lang="scss" scoped>
.container {
  padding: 1rem;
  border-radius: 1rem;
  background-color: var(--clr-neutral-700);
  border: 1px solid var(--clr-neutral-600);
}

.header {
  display: flex;
  justify-content: space-between;

  &__literals {
    font-size: var(--fs-500);
    font-weight: var(--fw-medium);
  }

  &__buttons {
    display: flex;
    gap: 0.5rem;
  }

  &__btn {
    background-color: var(--clr-neutral-600);
    color: var(--clr-neutral-300);
    border: none;
    padding: 0.375rem 1rem;
    border-radius: 100vmax;
    font-weight: var(--fw-bold);

    &.selected {
      filter: brightness(1.5);
    }
  }
}

.schedule {
  list-style: none;
  padding: 0;
  margin: 0;

  margin-top: 1rem;

  counter-reset: schedule;

  & > &__item:not(:last-child) {
    padding-block: 0.5rem;
    border-bottom: 1px solid var(--clr-neutral-600);
  }

  & > &__item:last-child {
    padding-top: 0.5rem;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__name {
    counter-increment: schedule;

    &::before {
      content: counter(schedule) ". ";
    }
  }

  &__info {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__class {
    background-color: var(--clr-neutral-600);
    border: 1px solid var(--clr-neutral-500);
    border-radius: 0.5rem;
    padding: 0.25rem 0.75rem;
  }
}
</style>
