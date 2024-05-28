<template>
  <ModalBase :onClose="onClose">
    <h2 class="heading">Создать пользователя</h2>

    <form class="form">
      <InputGroup
        elevated
        label="Фамилия"
        id="lastname"
        @onChange="(value) => handleInputChange('lastName', value)"
      />
      <InputGroup
        elevated
        label="Имя"
        id="name"
        @onChange="(value) => handleInputChange('name', value)"
      />
      <InputGroup
        elevated
        label="Отчество"
        id="patronymic"
        @onChange="(value) => handleInputChange('patronymic', value)"
      />
      <DropdownGroup
        elevated
        label="Роль"
        id="role"
        :options="roles"
        @onChange="(value) => handleInputChange('role', value.value)"
      />

      <Accordion
        v-if="formData.role === 'professor'"
        class="subjects"
        name="Предметы"
        elevated
      >
        <div class="subjects__list">
          <div v-for="data in formData.subjects" class="subjects__item">
            <SubjectSelect
              class="subjects__select"
              placeholder="Предмет"
              :options="subjects"
              :selected="data"
            />
            <button class="subjects__remove-button">
              <Xmark />
            </button>
          </div>
        </div>

        <Button
          @click.prevent="formData.subjects.push('')"
          class="subjects__button"
          label="Добавить предмет"
          center
        />
      </Accordion>

      <Button
        class="form__button"
        elevated
        center
        label="Создать"
        :trailing="Plus"
        @click.prevent="() => {}"
      />
    </form>
  </ModalBase>
</template>

<script lang="ts" setup>
import ModalBase from "@/components/ModalBase.vue";
import InputGroup from "@/components/ui/InputGroup.vue";
import DropdownGroup from "@/components/ui/DropdownGroup.vue";
import Accordion from "@/components/Accordion.vue";
import SubjectSelect from "@/views/GroupInfoView/components/SubjectSelect.vue";
import Button from "@/components/ui/Button.vue";
import Plus from "@/assets/icons/Plus.vue";
import Xmark from "@/assets/icons/Xmark.vue";
import { reactive } from "vue";

const formData = reactive({
  name: "",
  lastName: "",
  patronymic: "",
  role: "",
  subjects: [],
});

const handleInputChange = (field, value) => {
  formData[field] = value;
};

const props = defineProps({
  onClose: {
    type: Function,
    required: true,
  },
});

const roles = [
  { name: "Студент", value: "student" },
  { name: "Преподаватель", value: "professor" },
  { name: "Администратор", value: "admin" },
  { name: "Гл. Администратор", value: "headadmin" },
];

const subjects = [
  "Основы Front-End",
  "Основы Back-End",
  "Программирование",
  "Математика",
  "Казахский Язык",
];
</script>

<style lang="scss" scoped>
.heading {
  font-size: var(--fs-600);
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
