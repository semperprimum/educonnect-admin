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

    <UserList :users="mockUsers" class="user-list" />
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
import type { User } from "@/types";

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

const mockUsers: User[] = [
  { name: "Ульданов Мансур Азатович", role: "Гл. Администратор", group: null },
  { name: "Кишибаев Нуржан Еркешович", role: "Гл. Администратор", group: null },
  { name: "Ким Богдан Данилович", role: "Администратор", group: null },
  { name: "Попов Денис Валентинович", role: "Преподаватель", group: null },
  { name: "Гульнар Нурхамитовна", role: "Преподаватель", group: null },
  { name: "Асылжан Сабыржанович", role: "Преподаватель", group: null },
  { name: "Айнұр Бауыржанқызы", role: "Преподаватель", group: null },
  { name: "Ербол Аскарович", role: "Преподаватель", group: null },
  { name: "Айбек Али", role: "Студент", group: "П-21-57к" },
  { name: "Айрих Алексей", role: "Студент", group: "П-21-57к" },
  { name: "Алькенов Аян", role: "Студент", group: "П-21-57к" },
  { name: "Атамбозова Акерке", role: "Студент", group: "П-21-57к" },
  { name: "Атамурат Темирлан", role: "Студент", group: "П-21-57к" },
  { name: "Байбурин Марлен", role: "Студент", group: "П-21-57к" },
  { name: "Башарин Глеб", role: "Студент", group: "П-21-57к" },
  { name: "Бельц Никита", role: "Студент", group: "П-21-57к" },
  { name: "Бисен Алмас", role: "Студент", group: "П-21-57к" },
  { name: "Есеркепов Азамат", role: "Студент", group: "П-21-57к" },
  { name: "Жукасаев Тамирлан", role: "Студент", group: "П-21-57к" },
  { name: "Ибраев Альжан", role: "Студент", group: "П-21-57к" },
  { name: "Камышанская Екатерина", role: "Студент", group: "П-21-57к" },
  { name: "Кенжебаев Руслан", role: "Студент", group: "П-21-57к" },
  { name: "Кишко Ростислав", role: "Студент", group: "П-21-57к" },
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
