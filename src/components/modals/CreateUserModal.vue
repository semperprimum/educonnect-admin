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
        v-if="formData.role === 'professor'"
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

      <Button
        elevated
        center
        label="Создать"
        :trailing="Plus"
        @click.prevent="() => {}"
      />
    </form>
  </ModalBase>
</template>

<script setup>
import ModalBase from "@/components/ModalBase.vue";
import InputGroup from "@/components/ui/InputGroup.vue";
import DropdownGroup from "@/components/ui/DropdownGroup.vue";
import Button from "@/components/ui/Button.vue";
import Plus from "@/assets/icons/Plus.vue";
import { reactive } from "vue";

const formData = reactive({
  name: "",
  lastName: "",
  patronymic: "",
  role: "",
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
  { name: "Преподаватель", value: "professor" },
  { name: "Студент", value: "student" },
];
</script>

<style lang="scss" scoped>
.heading {
  font-size: 2rem;
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
