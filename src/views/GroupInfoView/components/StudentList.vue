<template>
  <div class="students">
    <p class="students__label">Список группы</p>

    <ol class="students__list">
      <li
        v-for="student in students"
        :key="student"
        class="students__item"
      >
        <span class="students__name">
          {{ student }}
        </span>
        <button
          class="students__button-remove"
          aria-label="Открепить студента"
        >
          <Xmark aria-hidden="false" />
        </button>
      </li>
    </ol>

    <Button
      class="students__button"
      label="Добавить студента"
      :trailing="Plus"
    />
  </div>
</template>

<script setup>
import Button from "@/components/ui/Button.vue";
import Plus from "@/assets/icons/Plus.vue";
import Xmark from "@/assets/icons/Xmark.vue";

const students = [
  "Айбек Али",
  "Айрих Алексей",
  "Алькенов Аян",
  "Атамбозова Акерке",
  "Атамурат Темирлан",
  "Байбурин Марлен",
  "Башарин Глеб",
  "Бельц Никита",
  "Бисен Алмас",
  "Есеркепов Азамат",
  "Жукасаев Тамирлан",
  "Ибраев Альжан",
  "Камышанская Екатерина",
  "Кенжебаев Руслан",
  "Ким Богдан",
  "Кишибаев Нурдан",
  "Кишко Ростислав",
];
</script>

<style lang="scss" scoped>
.students {
  &__label {
    color: var(--clr-neutral-300);
    font-weight: 500;
    font-size: 1.25rem;

    margin-bottom: 0.25rem;
  }

  &__list {
    overflow-y: auto;
    max-height: 100%;

    padding: 1rem;
    margin: 0 0 1rem 0;
    list-style: none;
    border-radius: 1rem;
    border: 1px solid var(--clr-neutral-500);

    counter-reset: student;

    background-color: var(--clr-neutral-700);
  }

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    & + & {
      padding-top: 0.5rem;
    }

    &:not(:last-child) {
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--clr-neutral-500);
    }

    &:hover {
      .students__button-remove {
        opacity: 1;
      }
    }
  }

  &__name {
    font-size: 1.15rem;
    counter-increment: student;

    &::before {
      content: counter(student) ". ";
    }
  }

  &__button {
    width: 100%;
    justify-content: center;
  }

  &__button-remove {
    background: none;
    border: none;

    svg {
      fill: var(--clr-neutral-300);
      display: block;

      width: 1.15rem;
      aspect-ratio: 1;
    }

    @media only screen and (min-width: 90em) {
      cursor: pointer;
      transition: opacity 150ms ease;
      opacity: 0;

      svg {
        transition: fill 150ms ease;
      }

      &:hover {
        svg {
          fill: var(--clr-neutral-100);
        }
      }
    }
  }
}
</style>
