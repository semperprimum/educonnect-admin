<template>
  <div class="students">
    <p class="students__label">{{ t("group_list") }}</p>

    <ol class="students__list">
      <li
        v-for="student in groupStore.group?.students"
        :key="student.fio"
        class="students__item"
      >
        <span class="students__name">
          {{ student.fio }}
        </span>

        <select
          @change="(e) => handleSubgroupChange(e, student.id)"
          class="students__subgroup-select"
          name="subgroup"
          id="subgroup"
        >
          <option :selected="student.subgroup === 'A'" value="A">A</option>
          <option :selected="student.subgroup === 'B'" value="B">Б</option>
        </select>

        <button
          class="students__button-remove"
          aria-label="Открепить студента"
          @click="
            openUnattachStudentModal(
              student.fio,
              groupStore.group?.title!,
              student.id,
            )
          "
        >
          <Xmark aria-hidden="false" />
        </button>
      </li>
    </ol>

    <Button
      center
      @click.prevent="openAddStudentModal"
      class="students__button"
      :label="t('add_student')"
      :trailing="Plus"
    />
  </div>
</template>

<script lang="ts" setup>
import Button from "@/components/ui/Button.vue";
import Plus from "@/assets/icons/Plus.vue";
import Xmark from "@/assets/icons/Xmark.vue";
import ModalService from "@/services/ModalService";
import { useGroupStore } from "@/stores/group";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const groupStore = useGroupStore();
const currentRoute = useRoute();
const { t } = useI18n();

const openAddStudentModal = () => {
  ModalService.open("AddStudentModal", { groupId: +currentRoute.params.id });
};

const openUnattachStudentModal = (
  studentName: string,
  groupName: string,
  studentId: number,
) => {
  ModalService.open("UnattachStudentModal", {
    groupId: +currentRoute.params.id,
    groupName,
    studentName,
    studentId,
  });
};

const handleSubgroupChange = async (event: Event, studentId: number) => {
  if (!groupStore.group) return;
  const subgroup = (event.target as HTMLSelectElement).value;

  await groupStore.updateStudentSubgroup(
    +currentRoute.params.id,
    studentId,
    subgroup,
  );
};
</script>

<style lang="scss" scoped>
.students {
  &__label {
    color: var(--clr-neutral-300);
    font-weight: var(--fw-medium);
    font-size: var(--fs-300);

    margin-bottom: 0.25rem;
  }

  &__list {
    overflow-y: auto;
    max-height: 100%;

    padding: 1rem;
    margin: 0 0 1rem 0;
    list-style: none;
    border-radius: 1rem;
    border: 1px solid var(--clr-neutral-600);

    counter-reset: student;

    background-color: var(--clr-neutral-700);

    display: grid;
    grid-template-columns: 1fr auto auto;

    width: 25rem;
  }

  &__item {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: span 3;
    gap: 0.5rem;

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
    counter-increment: student;

    &::before {
      content: counter(student) ". ";
    }
  }

  &__button {
    width: 100%;
  }

  &__subgroup-select {
    appearance: none;
    border: none;
    color: var(--clr-neutral-300);
    background-color: var(--clr-neutral-500);
    font-weight: var(--fw-bold);

    width: 1.625rem;
    aspect-ratio: 1;
    text-align: center;

    border-radius: 0.3125rem;
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
