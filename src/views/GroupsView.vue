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
  </AppTemplate>
</template>

<script setup>
import AppTemplate from "@/components/AppTemplate.vue";
import Dropdown from "@/components/ui/Dropdown.vue";
import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/Button.vue";
import MagnifyingGlass from "@/assets/icons/MagnifyingGlass.vue";
import Plus from "@/assets/icons/Plus.vue";

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
</style>
