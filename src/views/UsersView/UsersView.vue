<template>
  <ContainerWithHeading :heading="t('users')">
    <header class="header">
      <div class="header__left">
        <Input
          v-model="searchQuery"
          :placeholder="t('search')"
          :trailing="MagnifyingGlass"
        />
        <Multiselect
          v-model="selectedRole"
          :options="roleOptions"
          :placeholder="t('role')"
          track-by="value"
          label="title"
        />
      </div>

      <div class="header__right">
        <Button
          @click="openCreateUserModal"
          :label="t('create_user')"
          :trailing="Plus"
        />
      </div>
    </header>

    <UserList :users="filteredUsers" class="user-list" />
  </ContainerWithHeading>
</template>

<script lang="ts" setup>
import ContainerWithHeading from "@/components/ContainerWithHeading.vue";
import Input from "@/components/ui/Input.vue";
import Multiselect from "vue-multiselect";
import MagnifyingGlass from "@/assets/icons/MagnifyingGlass.vue";
import Button from "@/components/ui/Button.vue";
import Plus from "@/assets/icons/Plus.vue";
import UserList from "./components/UserList.vue";
import ModalService from "@/services/ModalService";
import { useUserStore, type User } from "@/stores/user";
import { computed, onMounted, ref, type ComputedRef, type Ref } from "vue";
import { matchSorter } from "match-sorter";
import { useI18n } from "vue-i18n";

const userStore = useUserStore();
const selectedRole: Ref<{ title: string; value: string } | null> = ref(null);
const searchQuery: Ref<string | null> = ref(null);
const { t } = useI18n();

onMounted(async () => {
  await userStore.fetchAllUsers();
});

const filteredUsers: ComputedRef<User[]> = computed(() => {
  if (!userStore.users) return [];
  let users = userStore.users;

  if (selectedRole.value) {
    users = users.filter((user) => user.role === selectedRole.value?.value);
  }

  if (searchQuery.value) {
    users = matchSorter(users, searchQuery.value, { keys: ["fio"] });
  }

  return users;
});

const openCreateUserModal = () => {
  ModalService.open("CreateUserModal");
};

const roleOptions = [
  { title: "Администратор", value: "Admin" },
  { title: "Преподаватель", value: "Teacher" },
  { title: "Студент", value: "Student" },
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
