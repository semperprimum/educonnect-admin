<template>
  <div class="events">
    <div v-for="event in mockEvents" class="events__item">
      <Checkbox class="events__checkbox" :checked="event.isCompleted" />

      <div class="events__info">
        <span class="events__date">{{ event.info }}</span>
        <span class="events__title">{{ event.title }}</span>
      </div>

      <p class="events__type">{{ event.type }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Checkbox from "@/components/ui/Checkbox.vue";

const mockEvents = [
  {
    title: "Сбор кураторов в преподавательской",
    info: "17.01.2024, в 15:20, аудитория 1310",
    type: "Мероприятие",
    isCompleted: false,
  },
  {
    title: "Сбор в актовом зале",
    info: "14.01.2024, в 13:00",
    type: "Мероприятие",
    isCompleted: false,
  },
  {
    title: "Кураторский час",
    info: "19.01.2024, в 8:30, П-21-57к, аудитория 2217",
    type: "Мероприятие",
    isCompleted: false,
  },
  {
    title: "Месячное собрание преподавателей",
    info: "30.12.2023, в 17:00",
    type: "Мероприятие",
    isCompleted: true,
  },
];
</script>

<style lang="scss" scoped>
.events {
  flex: 1;

  display: grid;
  gap: 1rem;

  &__item {
    @media only screen and (max-width: 48em) {
      flex-direction: column;
      align-items: start;
    }

    background-color: var(--clr-neutral-700);
    padding: 1rem;
    border: 1px solid var(--clr-neutral-600);
    border-radius: 1rem;

    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__info {
    display: grid;
    flex: 1;

    span {
      &:nth-child(1) {
        color: var(--clr-neutral-300);
        font-size: var(--fs-100);
      }
      &:nth-child(2) {
        font-weight: var(--fw-medium);
      }
    }
  }

  &__checkbox {
    &:checked {
      & + .events__info .events__title {
        text-decoration: line-through;
        color: var(--clr-neutral-300);
      }
    }
  }
}
</style>
