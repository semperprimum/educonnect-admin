<template>
  <ModalBase :onClose="onClose">
    <h2 class="heading">{{ t("change_class") }}</h2>
    <span class="info"
      >{{ t(weekDays[weekIndex]) }}, {{ subject.number }} пара |
      {{
        subject.subjectId
          ? getSubjectFromGroup(subject.subjectId)?.subject.title
          : "Нет пары"
      }}
      | {{ groupStore?.group?.title || "" }}</span
    >

    <form @submit.prevent="onSubmit" class="form">
      <Multiselect
        v-model="selectedTeacherSubject"
        class="elevated"
        :show-labels="false"
        :options="groupStore.group?.subjects"
        :custom-label="customLabel"
      />

      <Button class="form__button" elevated center :label="t('change_class')" />
    </form>
  </ModalBase>
</template>

<script lang="ts" setup>
import ModalBase from "@/components/ModalBase.vue";
import Multiselect from "vue-multiselect";
import Button from "@/components/ui/Button.vue";
import { useI18n } from "vue-i18n";
import { useGroupStore } from "@/stores/group";
import { ref } from "vue";
import type { Ref } from "vue";
import type { Subject } from "@/types";
import type { Subject as GroupSubject } from "@/stores/group";

const { t } = useI18n();
const groupStore = useGroupStore();
const selectedTeacherSubject: Ref<GroupSubject | null> = ref(null);

const getSubjectFromGroup = (teacherSubjectId: number) => {
  if (!groupStore.group) return;

  return groupStore.group.subjects.find((el) => el.id === teacherSubjectId);
};

const customLabel = (subject: GroupSubject) => {
  return `${subject.subject.title} - ${subject.teacher.fio}`;
};

const onSubmit = async () => {
  if (!groupStore.group || !selectedTeacherSubject.value) return;

  const groupId = groupStore.group?.id;
  await groupStore.changeSchedule(
    groupId,
    props.weekIndex + 1,
    props.subject.number,
    selectedTeacherSubject.value?.id,
  );

  props.onClose();
};

const weekDays: string[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

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

.info {
  color: var(--clr-neutral-300);
}

.form {
  display: grid;
  margin-top: 1rem;
  gap: 1rem;

  &__input {
    max-width: 10rem;
  }

  &__button {
    margin-top: 1.5rem;
  }
}
</style>
