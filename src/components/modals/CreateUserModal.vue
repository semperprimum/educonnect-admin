<template>
  <ModalBase :onClose="onClose">
    <h2 class="heading">Создать пользователя</h2>

    <form @submit="onSubmit" class="form">
      <span class="label">Имя</span>
      <Input :error="errors.name" elevated v-model="name" />

      <span class="label">Фамилия</span>
      <Input :error="errors.lastName" elevated v-model="lastName" />

      <div v-if="role === 'admin' || role === 'teacher'">
        <span class="label margin">Отчество</span>
        <Input
          no-error-margin
          :error="errors.patronymic"
          elevated
          v-model="patronymic"
        />
      </div>

      <span class="label">Роль</span>
      <Multiselect
        class="elevated"
        placeholder="Выберите роль"
        :showLabels="false"
        v-model="role"
        :allow-empty="false"
        :options="['student', 'teacher', 'admin']"
      />
      <ErrorText v-if="errors.role">{{ errors.role }}</ErrorText>

      <div v-if="role === 'teacher'">
        <span class="label margin">Предметы</span>
        <Multiselect
          class="elevated"
          placeholder="Выберите предметы"
          :showLabels="false"
          v-model="subjects"
          track-by="id"
          label="title"
          multiple
          :options="generalStore.subjects"
        />
        <ErrorText v-if="errors.subjects">{{ errors.subjects }}</ErrorText>
      </div>

      <div v-if="role === 'admin'">
        <span class="label margin">Привилегии</span>
        <Multiselect
          class="elevated"
          placeholder="Выберите привилегии"
          :showLabels="false"
          v-model="privileges"
          multiple
          :options="[
            'SuperAdmin',
            'Operator',
            'GroupManager',
            'ScheduleCoordinator',
          ]"
        />
        <ErrorText v-if="errors.privileges">{{ errors.privileges }}</ErrorText>
      </div>

      <Button
        class="form__button"
        elevated
        center
        label="Создать"
        :trailing="Plus"
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
import ErrorText from "@/components/ErrorText.vue";
import { useGeneralStore } from "@/stores/general";
import { useUserStore } from "@/stores/user";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { computed } from "vue";

interface FormData {
  name: string;
  lastName: string;
  patronymic: string;
  role: string;
  subjects: { id: number; title: string }[];
  privileges: string[];
}

const validationSchema = yup.object({
  name: yup.string().required("Обязательное поле"),
  lastName: yup.string().required("Обязательное поле"),
  role: yup
    .string<"student" | "admin" | "teacher">()
    .required("Обязательное поле"),
  patronymic: yup.string().when("role", {
    is: (val: string) => val === "teacher" || val === "admin",
    then: (schema) => schema.required("Обязательное поле"),
  }),
  subjects: yup.array<{ id: number; title: string }[]>().when("role", {
    is: "teacher",
    then: (schema) => schema.required("Обязательное поле"),
  }),
  privileges: yup.array<string[]>().when("role", {
    is: "admin",
    then: (schema) => schema.required("Обязательное поле"),
  }),
});

const generalStore = useGeneralStore();
const userStore = useUserStore();

const { defineField, handleSubmit, errors } = useForm<FormData>({
  validationSchema,
});

const [name] = defineField("name");
const [lastName] = defineField("lastName");
const [patronymic] = defineField("patronymic");
const [role] = defineField("role");
const [subjects] = defineField("subjects");
const [privileges] = defineField("privileges");

const onSubmit = handleSubmit(async (values) => {
  const subjectNumArray = computed(() => values.subjects.map((el) => el.id));

  switch (values.role) {
    case "student":
      await userStore.createStudent(values.name, values.lastName);
      break;
    case "teacher":
      await userStore.createTeacher(
        values.name,
        values.lastName,
        values.patronymic,
        subjectNumArray.value,
      );
    case "admin":
      await userStore.createAdmin(
        values.name,
        values.lastName,
        values.patronymic,
        values.privileges,
      );
  }

  props.onClose();
});

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
