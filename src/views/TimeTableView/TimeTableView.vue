<template>
  <ContainerWithHeading heading="Расписание">
    <div class="filter-bar">
      <Input placeholder="Поиск" :trailing="MagnifyingGlass" />

      <Dropdown :options="options" label="Специальность" />

      <Button @click="openActiveSubstitutionsModal" label="Активные замены" />

      <Button @click="openSubstitutionRequestsModal" label="Запросы на замену" />
    </div>

    <div class="content">
      <GroupTile v-for="group in mockGroups" :key="group.literals" :group="group"
        @click="router.push(`/timetable/${group.id}`)" />
    </div>
  </ContainerWithHeading>
</template>

<script setup>
import ContainerWithHeading from "@/components/ContainerWithHeading.vue";
import Dropdown from "@/components/ui/Dropdown.vue";
import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/Button.vue";
import MagnifyingGlass from "@/assets/icons/MagnifyingGlass.vue";
import GroupTile from "@/components/GroupTile.vue";

import mockGroups from "@/views/mockGroups.json";
import { useRouter } from "vue-router";
import ModalService from "@/services/ModalService";

const router = useRouter();

const openSubstitutionRequestsModal = () => {
  ModalService.open("SubstitutionRequestsModal");
};

const openActiveSubstitutionsModal = () => {
  ModalService.open("ActiveSubstitutionsModal");
};

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

    button:nth-of-type(1) {
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
