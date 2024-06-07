<template>
  <ModalBase :onClose="onClose">
    <h2 class="heading">Откерпить студента</h2>
    <p class="confirmation">
      Вы уверены, что хотите открепить студента
      <span>{{ studentName }}</span> от группы <span>{{ groupName }}</span
      >?
    </p>

    <div class="button-pair">
      <Button @click="onClose" center elevated label="Отмена" />
      <Button @click.prevent="handleSubmit" center danger label="Открепить" />
    </div>
  </ModalBase>
</template>

<script lang="ts" setup>
import ModalBase from "@/components/ModalBase.vue";
import Button from "@/components/ui/Button.vue";
import { useGroupStore } from "@/stores/group";

const groupStore = useGroupStore();

const handleSubmit = async () => {
  await groupStore.removeStudent(props.groupId, props.studentId);

  props.onClose();
};

const props = defineProps<{
  onClose: () => void;
  groupId: number;
  studentName: string;
  studentId: number;
  groupName: string;
}>();
</script>

<style lang="scss" scoped>
.heading {
  font-size: var(--fs-600);
}

.confirmation {
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
