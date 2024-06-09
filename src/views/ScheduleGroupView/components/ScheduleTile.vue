<template>
  <div class="tile">
    <div class="tile__header">
      <h3 class="tile__heading">Понедельник</h3>
      <span class="tile__date">10.05.24</span>
    </div>

    <ol class="tile__list">
      <li
        v-for="schedule in mockSchedule"
        :key="schedule.id"
        class="tile__item"
      >
        <div class="tile__item-group">
          <h4 class="tile__item-title">{{ schedule.name || "Нет пары" }}</h4>
          <Classroom :classrooms="schedule.classroom" />
        </div>

        <ElipsisMenu
          :options="[
            {
              name: 'Изменить предмет',
              action: () => {
                openChangeSubjectModal();
              },
            },
          ]"
        />
      </li>
    </ol>
  </div>
</template>

<script lang="ts" setup>
import ElipsisMenu from "@/components/ui/ElipsisMenu.vue";
import ModalService from "@/services/ModalService.js";
import Classroom from "@/components/Classroom.vue";

const openChangeSubjectModal = () => {
  ModalService.open("ChangeSubjectModal");
};

const mockSchedule = [
  {
    id: 1,
    name: null,
    classroom: null,
  },
  {
    id: 2,
    name: "Программирование Длинное Название",
    classroom: ["1308"],
  },
  {
    id: 3,
    name: "Тестирование ПО",
    classroom: ["1412", "1314"],
  },
  {
    id: 4,
    name: "ООП",
    classroom: ["1410"],
  },
  {
    id: 5,
    name: "Социология",
    classroom: ["2414"],
  },
  {
    id: 6,
    name: null,
    classroom: null,
  },
];
</script>

<style lang="scss" scoped>
.tile {
  position: relative;

  --clr-accent: #ef4444a6;

  background-color: var(--clr-neutral-700);
  border: 1px solid var(--clr-neutral-600);
  border-radius: 1rem;
  padding: 1rem;
  z-index: 1;
  overflow: hidden;

  background: var(--clr-neutral-700)
    radial-gradient(circle, var(--clr-accent) 0%, var(--clr-neutral-700) 50%);
  background-size: 40rem 40rem;
  background-position: bottom -15rem right -15rem;
  background-repeat: no-repeat;

  /* &::before {
    content: "";
    width: min(25rem, 100%);
    aspect-ratio: 1;
    background-color: var(--clr-accent);
    position: absolute;

    border-radius: 100vmax;
    filter: blur(9999px);
    opacity: 0.4;
    z-index: -1;

    bottom: -2rem;
    right: -5rem;
  } */

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__heading {
    font-size: calc(var(--fs-500) * 1.25);
  }

  &__date {
    color: var(--clr-neutral-300);
    font-weight: var(--fw-medium);
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    counter-reset: schedule;

    & > *:not(:last-child) {
      position: relative;

      &::before {
        content: "";
        width: 100%;
        height: 1px;
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: var(--clr-neutral-600);

        mix-blend-mode: color-dodge;
      }
    }
  }

  &__item {
    display: flex;
    max-width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;

    padding: 0.75rem 0;

    &-group {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr auto;
    }

    &-title {
      font-weight: var(--fw-medium);
      font-size: var(--fs-400);
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      &::before {
        counter-increment: schedule;
        content: counter(schedule) ". ";
      }
    }

    &-classroom {
      display: block;
      font-size: var(--fs-100);
      width: 3.5rem;
      height: 1.75rem;
      background-color: var(--clr-neutral-600);
      border-radius: 0.25rem;
      border: 1px solid var(--clr-neutral-500);

      display: grid;
      place-items: center;

      mix-blend-mode: color-dodge;
    }
  }

  &__button {
    background: none;
    border: none;
    svg {
      display: block;
      height: 1rem;
      width: 100%;
      fill: var(--clr-neutral-400);
      mix-blend-mode: color-dodge;
    }
  }

  &:nth-child(2) {
    --clr-accent: #f97316;
  }

  &:nth-child(3) {
    --clr-accent: #eab308;
  }

  &:nth-child(4) {
    --clr-accent: #84cc16;
  }

  &:nth-child(5) {
    --clr-accent: #0ea5e9;
  }

  &:nth-child(6) {
    --clr-accent: #a855f7;
  }
}
</style>
