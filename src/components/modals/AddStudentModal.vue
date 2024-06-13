<template>
  <ModalBase :onClose="onClose">
    <h2 class="heading">Добавить студента</h2>
    <form @submit.prevent="handleSubmit" class="form">
      <Multiselect
        class="elevated"
        v-model="selectedUser"
        track-by="id"
        label="fio"
        :show-labels="false"
        :options="students"
      />

      <Button
        @click.prevent="handleSubmit"
        center
        elevated
        label="Добавить"
        :trailing="Plus"
      />
    </form>
  </ModalBase>
</template>

<script lang="ts" setup>
import Button from "@/components/ui/Button.vue";
import Plus from "@/assets/icons/Plus.vue";
import ModalBase from "@/components/ModalBase.vue";
import Multiselect from "vue-multiselect";
import { onMounted, ref, type Ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useGroupStore } from "@/stores/group";

const userStore = useUserStore();
const groupStore = useGroupStore();
const selectedUser: Ref<{ id: number; fio: string } | null> = ref(null);
const students: Ref<{ id: number; fio: string }[]> = ref([]);

const handleSubmit = async () => {
  if (!selectedUser.value) return;

  await groupStore.addStudent(props.groupId, selectedUser.value.id);

  props.onClose();
};

onMounted(async () => {
  students.value = await userStore.fetchFreeStudents(props.groupId);
});

const props = defineProps<{
  onClose: () => void;
  groupId: number;
}>();
</script>

<style lang="scss" scoped>
.heading {
  font-size: var(--fs-600);
}

.form {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;

  button {
    margin-top: 1.5rem;
  }
}
</style>
