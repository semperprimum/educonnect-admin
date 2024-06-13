<template>
  <ModalBase :onClose="onClose">
    <h2 class="heading">Отменить пару</h2>

    <p class="confirmation-text">
      Вы уверены, что хотите отменить пару
      <span>{{
        subject.subjectId
          ? getSubjectFromGroup(subject.subjectId)?.subject.title
          : "Нет пары"
      }}</span>
      ({{ t(weekDays[weekIndex]) }}, {{ subject.number }} пара)?
    </p>

    <div class="button-pair">
      <Button @click="() => onClose()" center elevated label="Закрыть" />
      <Button @click="onSubmit" center danger label="Отменить пару" />
    </div>
  </ModalBase>
</template>

<script lang="ts" setup>
import ModalBase from "@/components/ModalBase.vue";
import Button from "@/components/ui/Button.vue";
import { useGroupStore } from "@/stores/group";
import type { Subject } from "@/types";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

const { t } = useI18n();
const groupStore = useGroupStore();
const currentRoute = useRoute();
const weekDays: string[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const getSubjectFromGroup = (teacherSubjectId: number) => {
  if (!groupStore.group) return;

  return groupStore.group.subjects.find((el) => el.id === teacherSubjectId);
};

const onSubmit = async () => {
  if (!groupStore.group) return;
  if (!props.subject.dayWeek || !props.subject.number) return;

  await groupStore.removeSubjectFromSchedule(
    +currentRoute.params.id,
    props.subject.dayWeek,
    props.subject.number,
  );

  props.onClose();
};

const props = defineProps<{
  onClose: () => void;
  subject: Subject;
  weekIndex: number;
}>();
</script>

<style lang="scss" scoped>
.heading {
  font-size: var(--fs-600);
}

.confirmation-text {
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-size: var(--fs-300);

  span {
    color: var(--clr-red-400);
    font-weight: var(--fw-bold);
  }
}

.button-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
</style>
