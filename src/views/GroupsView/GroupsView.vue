<template>
  <ContainerWithHeading heading="Группы">
    <div class="filter-bar">
      <Input placeholder="Поиск" :trailing="MagnifyingGlass" />

      <Dropdown :options="options" label="Специальность" />

      <Button
        label="Создать группу"
        :trailing="Plus"
        @click="openCreateGroupModal"
      />
    </div>

    <div class="content">
      <GroupTile
        v-for="group in groupStore.groups"
        :key="group.title"
        :group="group"
        @click="router.push(`/groups/${group.id}`)"
      />
    </div>
  </ContainerWithHeading>
</template>

<script setup lang="ts">
import ContainerWithHeading from "@/components/ContainerWithHeading.vue";
import Dropdown from "@/components/ui/Dropdown.vue";
import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/Button.vue";
import MagnifyingGlass from "@/assets/icons/MagnifyingGlass.vue";
import Plus from "@/assets/icons/Plus.vue";
import GroupTile from "@/components/GroupTile.vue";

import { useRouter } from "vue-router";
import ModalService from "@/services/ModalService";
import { onMounted } from "vue";
import { useGroupStore } from "@/stores/group";

const groupStore = useGroupStore();
const router = useRouter();

onMounted(async () => {
  await groupStore.getGroups();
});

const options = [
  {
    name: "все",
    value: "all",
  },
  {
    name: "программирование",
    value: "programming",
  },
  {
    name: "дизайн",
    value: "design",
  },
  {
    name: "туризм",
    value: "tourism",
  },
];

const openCreateGroupModal = () => {
  ModalService.open("CreateGroupModal");
};
</script>

<style lang="scss" scoped>
.filter-bar {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  button {
    max-width: fit-content;
  }

  @media only screen and (min-width: 63rem) {
    flex-direction: row;

    button {
      margin-left: auto;
    }
  }
}

.content {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  margin-top: 1rem;

  @media only screen and (min-width: 54em) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (min-width: 69em) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (min-width: 90em) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
