<template>
  <ol class="list">
    <li v-for="user in users" class="item">
      <span class="item__name">{{ user.fio }}</span>
      <span>{{ user.role }}</span>
      <ElipsisMenu
        :options="[
          ...(user.login
            ? [
                {
                  name: t('copy_login'),
                  action: async () => {
                    await copy(user.login);
                  },
                },
              ]
            : []),
          {
            name: t('delete_user'),
            action: () => openDeleteUserModal(user.id, user.role, user.fio),
          },
        ]"
      />
    </li>
  </ol>
</template>

<script lang="ts" setup>
import ElipsisMenu from "@/components/ui/ElipsisMenu.vue";
import ModalService from "@/services/ModalService";
import type { User } from "@/stores/user";
import { useClipboard } from "@vueuse/core";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { copy } = useClipboard();

defineProps<{
  users: User[];
}>();

const openDeleteUserModal = (id: number, role: string, name: string) => {
  ModalService.open("DeleteUserModal", { id, role, name });
};
</script>

<style lang="scss" scoped>
.list {
  list-style: none;
  padding: 0;
  margin: 0;

  counter-reset: userList;

  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 2rem;
}

.item {
  counter-increment: userList;
  display: grid;
  align-items: center;

  grid-template-columns: subgrid;
  grid-column: span 3;

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
