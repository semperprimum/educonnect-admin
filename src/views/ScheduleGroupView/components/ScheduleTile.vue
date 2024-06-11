<template>
  <div class="tile">
    <div class="tile__header">
      <h3 class="tile__heading">{{ t(schedule.dayOfWeek.toLowerCase()) }}</h3>
      <span class="tile__date">{{ schedule.date }}</span>
    </div>

    <ol class="tile__list">
      <li
        v-for="subject in schedule.subjects"
        :key="schedule.date"
        class="tile__item"
      >
        <div class="tile__item-group">
          <h4
            class="tile__item-title"
            :class="{ 'no-class': !subject.subject }"
          >
            {{ subject?.subject || t("no_class") }}
          </h4>
          <span v-if="subject?.auditorium" class="tile__item-classroom">{{
            subject?.auditorium
          }}</span>
        </div>

        <ElipsisMenu
          :options="[
            {
              name: t('change_class'),
              action: () => {
                openChangeSubjectModal(
                  subject,
                  schedule.dayOfWeek,
                  schedule.date,
                );
              },
            },
            {
              name: t('cancel_class'),
              action: () => {},
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
import type { ScheduleDay, Subject } from "@/types";
import { useI18n } from "vue-i18n";

const openChangeSubjectModal = (
  subject: Subject,
  dayOfWeek: string,
  date: string,
) => {
  ModalService.open("ChangeSubjectModal", { subject, dayOfWeek, date });
};
const { t } = useI18n();

defineProps<{
  schedule: ScheduleDay;
}>();
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

      &.no-class {
        opacity: 0.65;
      }
    }

    &-classroom {
      display: block;
      font-size: var(--fs-100);
      font-family: monospace;
      // width: 3.5rem;
      padding: 0 0.5rem;
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
    --clr-accent: #f97316a6;
  }

  &:nth-child(3) {
    --clr-accent: #eab308a6;
  }

  &:nth-child(4) {
    --clr-accent: #84cc16a6;
  }

  &:nth-child(5) {
    --clr-accent: #0ea5e9a6;
  }

  &:nth-child(6) {
    --clr-accent: #a855f7a6;
  }
}
</style>
