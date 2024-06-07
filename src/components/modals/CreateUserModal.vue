<template>
  <ModalBase :onClose="onClose">
    <h2 class="heading">Создать пользователя</h2>

    <form class="form">
      <span class="label">Имя</span>
      <Input elevated v-model="formData.name" />

      <span class="label">Фамилия</span>
      <Input elevated v-model="formData.lastName" />

      <div v-if="formData.role === 'admin' || formData.role === 'teacher'">
        <span class="label">Отчество</span>
        <Input elevated v-model="formData.patronymic" />
      </div>

      <span class="label">Роль</span>
      <Multiselect
        class="elevated"
        v-model="formData.role"
        :allow-empty="false"
        :options="['student', 'teacher', 'admin']"
      />

      <div v-if="formData.role === 'teacher'">
        <span class="label margin">Предметы</span>
        <Multiselect
          class="elevated"
          v-model="formData.subjects"
          track-by="id"
          label="title"
          multiple
          :options="generalStore.subjects"
        />
      </div>

      <Button
        class="form__button"
        elevated
        center
        label="Создать"
        :trailing="Plus"
        @click.prevent="
          () => {
            handleSubmit();
          }
        "
      />
    </form>
  </ModalBase>
</template>

<script lang="ts" setup>
import ModalBase from "@/components/ModalBase.vue";
import Input from "../ui/Input.vue";
import Multiselect from "vue-multiselect";
import Button from "@/components/ui/Button.vue";
import Plus from "@/assets/icons/Plus.vue";
import { computed, reactive } from "vue";
import { useGeneralStore } from "@/stores/general";
import { useUserStore } from "@/stores/user";

interface FormData {
  name: string;
  lastName: string;
  patronymic: string;
  role: string;
  subjects: { id: number; title: string }[];
}

const generalStore = useGeneralStore();
const userStore = useUserStore();
const formData: FormData = reactive({
  name: "",
  lastName: "",
  patronymic: "",
  role: "student",
  subjects: [],
});

const subjectNumArray = computed(() => formData.subjects.map((el) => el.id));

const handleSubmit = async () => {
  switch (formData.role) {
    case "student":
      await userStore.createStudent(formData.name, formData.lastName);
      break;
    case "teacher":
      await userStore.createTeacher(
        formData.name,
        formData.lastName,
        formData.patronymic,
        subjectNumArray.value,
      );
  }

  props.onClose();
};

const props = defineProps<{
  onClose: () => void;
}>();
</script>

<style lang="scss" scoped>
.heading {
  font-size: var(--fs-600);
}

.label {
  display: block;
  font-size: var(--fs-300);
  font-weight: var(--fs-bold);
  color: var(--clr-neutral-300);
  margin-bottom: -0.5rem;

  &.margin {
    margin-bottom: 0.5rem;
  }
}

.form {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;

  &__button {
    margin-top: 1.5rem;
  }
}

.subjects {
  max-width: 65%;

  &__button {
    width: 100%;
    background-color: var(--clr-neutral-500);
    border: 1px solid var(--clr-neutral-400);
    margin-top: 1.5rem;
  }

  &__list {
    display: grid;
    gap: 1rem;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__select {
    flex: 1;
    background-color: var(--clr-neutral-500);
    border: 1px solid var(--clr-neutral-400);
  }

  &__remove-button {
    background: none;
    border: none;
    margin: 0;
    padding: 0;

    svg {
      display: block;
      width: 1.25rem;
      aspect-ratio: 1;
      fill: var(--clr-neutral-300);
    }
  }
}
</style>
