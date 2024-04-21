<template>
  <AppTemplate heading="Группы">
    <div class="filter-bar">
      <Dropdown
        :options="options"
        label="Специальность"
      />

      <Input
        placeholder="Поиск"
        :trailing="MagnifyingGlass"
      />

      <Button
        label="Создать группу"
        :trailing="Plus"
      />
    </div>

    <div class="content">
      <GroupTile
        v-for="group in mockGroups"
        :key="group.literals"
        :group="group"
      />
    </div>
  </AppTemplate>
</template>

<script setup>
import AppTemplate from "@/components/AppTemplate.vue";
import Dropdown from "@/components/ui/Dropdown.vue";
import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/Button.vue";
import MagnifyingGlass from "@/assets/icons/MagnifyingGlass.vue";
import Plus from "@/assets/icons/Plus.vue";
import GroupTile from "@/views/GroupsView/components/GroupTile.vue";

import mockGroups from "./mockGroups.json";

const options = [
  {
    name: "all",
    value: "all",
  },
  {
    name: "programming",
    value: "programming",
  },
  {
    name: "design",
    value: "design",
  },
  {
    name: "mechanic",
    value: "mechanic",
  },
];
</script>

<style lang="scss" scoped>
.filter-bar {
  display: flex;
  gap: 1rem;

  button {
    margin-left: auto;
  }
}

.content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;

  @media only screen and (min-width: 90em) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
