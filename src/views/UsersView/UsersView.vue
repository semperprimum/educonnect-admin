<template>
  <ContainerWithHeading heading="Пользователи">
    <header class="header">
      <div class="header__left">
        <Input placeholder="Поиск" :trailing="MagnifyingGlass" />
        <Dropdown label="Роль" :options="roleOptions" />
        <Dropdown label="Группа" :options="groupOptions" />
      </div>

      <div class="header__right">
        <Button
          @click="openCreateUserModal"
          label="Создать пользователя"
          :trailing="Plus"
        />
      </div>
    </header>

    <UserList class="user-list" />
  </ContainerWithHeading>
</template>

<script lang="ts" setup>
import ContainerWithHeading from "@/components/ContainerWithHeading.vue";
import Input from "@/components/ui/Input.vue";
import Dropdown from "@/components/ui/Dropdown.vue";
import MagnifyingGlass from "@/assets/icons/MagnifyingGlass.vue";
import Button from "@/components/ui/Button.vue";
import Plus from "@/assets/icons/Plus.vue";
import UserList from "./components/UserList.vue";
import ModalService from "@/services/ModalService";
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";

const userStore = useUserStore();

onMounted(async () => {
  await userStore.fetchAllUsers();
});

const openCreateUserModal = () => {
  ModalService.open("CreateUserModal");
};

const roleOptions = [
  { name: "Гл. Администратор", value: "HEAD_ADMIN" },
  { name: "Администратор", value: "ADMIN" },
  { name: "Преподаватель", value: "PROFESSOR" },
  { name: "Студент", value: "STUDENT" },
];

const groupOptions = [
  { name: "П-21-57к", value: "1" },
  { name: "П-21-57б", value: "2" },
];
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;

  &__left,
  &__right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}

.user-list {
  margin-top: 1rem;
}
</style>
