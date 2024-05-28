<template>
  <ol class="list">
    <li v-for="user in users" class="item">
      <span class="item__name">{{ user.name }}</span>
      <span>{{ user.role }}</span>
      <span>{{ user.group }}</span>
      <ElipsisMenu
        :options="[
          {
            name: 'Изменить пользователя',
            action: () => console.log('change user'),
          },
          {
            name: 'Скопировать логин',
            action: () => console.log('copy login'),
          },
          {
            name: 'Удалить пользователя',
            action: () => openDeleteUserModal(user.name),
          },
        ]"
      />
    </li>
  </ol>
</template>

<script lang="ts" setup>
import ElipsisMenu from "@/components/ui/ElipsisMenu.vue";
import ModalService from "@/services/ModalService";
import type { User } from "@/types";

const openDeleteUserModal = (name: string) => {
  ModalService.open("DeleteUserModal", { name });
};

defineProps<{
  users: User[];
}>();
</script>

<style lang="scss" scoped>
.list {
  list-style: none;
  padding: 0;
  margin: 0;

  counter-reset: userList;

  display: grid;
  grid-template-columns: auto auto 1fr auto;
  column-gap: 2rem;
}

.item {
  counter-increment: userList;
  display: grid;
  align-items: center;

  grid-template-columns: subgrid;
  grid-column: span 4;

  padding-block: 0.75rem;
  padding-inline: 0.5rem;
  border-bottom: 1px solid var(--clr-neutral-700);

  &__name {
    font-weight: var(--fw-medium);

    &::before {
      content: counter(userList) ". ";
    }
  }

  @media only screen and (min-width: 48em) {
    &:hover {
      background-color: var(--clr-neutral-700);
    }
  }
}

.elipsis-button {
  background: none;
  border: none;
  color: var(--clr-neutral-300);

  svg {
    display: block;
    width: 1.25rem;
    height: 1.25rem;
    fill: currentColor;
  }
}
</style>
